import shlex
import struct

import docker
import six


class SocketError(Exception):
    pass


def read(socket, n=4096):
    return socket.recv(n)


def read_exactly(socket, n):
    """
    Reads exactly n bytes from socket
    Raises SocketError if there isn't enough data
    """
    data = six.binary_type()
    while len(data) < n:
        next_data = read(socket, n - len(data))
        if not next_data:
            raise SocketError("Unexpected EOF")
        data += next_data
    return data


def next_frame_header(socket):
    """
    Returns the stream and size of the next frame of data waiting to be read
    from socket, according to the protocol defined here:

    https://docs.docker.com/engine/api/v1.24/#attach-to-a-container
    """
    try:
        data = read_exactly(socket, 8)
    except SocketError:
        return (-1, -1)

    stream, actual = struct.unpack(">BxxxL", data)
    return stream, actual


def frames_iter_no_tty(socket):
    """
    Returns a generator of data read from the socket when the tty setting is
    not enabled.
    """
    while True:
        (stream, n) = next_frame_header(socket)
        if n < 0:
            break
        while n > 0:
            result = read(socket, n)
            if result is None:
                continue
            data_length = len(result)
            if data_length == 0:
                # We have reached EOF
                return
            n -= data_length
            yield (stream, result)


class ExecResult:
    def __init__(self, exec_id, output):
        self.exec_id = exec_id
        self.output = output


class Execution:
    def __init__(self, exec_result: ExecResult, docker_client):
        self.exec_id = exec_result.exec_id
        self._sock = exec_result.output._sock
        self._sock.setblocking(0)
        self.docker_client = docker_client

    def write(self, string):
        self._sock.send((string + "\n").encode("utf-8"))

    def read(self):
        frames = frames_iter_no_tty(self._sock)
        data = []
        try:
            for frame in frames:
                data.append(frame[1].decode())
        except BlockingIOError:
            pass
        return "".join(data)

    def get_status(self):
        return self.docker_client.api.exec_inspect(self.exec_id)

    def get_exit_code(self):
        status = self.get_status()
        if not status["Running"]:
            return status["ExitCode"]

    def stop(self):
        self._sock.close()


class CompilationError(Exception):
    pass


class Executor:
    image = None

    def __init__(self, code, memory=128):
        self._client = docker.from_env()
        self._container = self._client.containers.run(
            self.image,
            detach=True,
            auto_remove=True,
            tty=True,
            stdin_open=True,
            mem_limit=f"{memory}m",
            memswap_limit=f"{memory}m",
        )
        self.code = code
        self._sock = None
        self.prepare_env()

    def prepare_env(self):
        pass

    def exec(self):
        return Execution(self.get_exec(), self._client)

    def get_exec(self):
        raise NotImplementedError

    def exec_run(self, cmd):
        resp = self._client.api.exec_create(
            self._container.id,
            cmd,
            stdout=True,
            stderr=True,
            stdin=True,
            tty=False,
            privileged=False,
            user="",
            environment=None,
            workdir=None,
        )
        exec_output = self._client.api.exec_start(
            resp["Id"],
            detach=False,
            tty=False,
            stream=False,
            socket=True,
            demux=False,
        )
        return ExecResult(resp["Id"], exec_output)

    def quote_code(self):
        return shlex.quote(self.code)

    def stop(self):
        self._container.stop()


class PythonExecutor(Executor):
    image = "python:latest"

    def prepare_env(self):
        script = f"echo {self.quote_code()} > code.py"
        self._container.exec_run(f"sh -c {shlex.quote(script)}")

    def get_exec(self):
        return self.exec_run("python -u code.py")


class CExecutor(Executor):
    image = "gcc:latest"

    def prepare_env(self):
        script = f"echo {self.quote_code()} > code.c"
        self._container.exec_run(f"sh -c {shlex.quote(script)}")
        result = self._container.exec_run("gcc -o app code.c")
        if result.exit_code != 0:
            self.stop()
            raise CompilationError
        self._container.exec_run("chmod a+x app")

    def get_exec(self):
        return self.exec_run("./app")


class JSExecutor(Executor):
    image = "node:latest"

    def prepare_env(self):
        script = f"echo {self.quote_code()} > code.js"
        self._container.exec_run(f"sh -c {shlex.quote(script)}")

    def get_exec(self):
        return self.exec_run("node code.js")


class PascalExecutor(Executor):
    image = "cmplopes/alpine-freepascal"

    def prepare_env(self):
        script = f"echo {self.quote_code()} > code.pas"
        self._container.exec_run(f"sh -c {shlex.quote(script)}")
        result = self._container.exec_run("fpc code.pas")
        if result.exit_code != 0:
            self.stop()
            raise CompilationError
        self._container.exec_run("chmod a+x code")

    def get_exec(self):
        return self.exec_run("./code")
