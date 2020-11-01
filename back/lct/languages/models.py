from .executors import CExecutor, JSExecutor, PascalExecutor, PythonExecutor


class Language:
    name = None
    verbose_name = None
    executor_class = None


class LanguageC(Language):
    name = "c"
    verbose_name = "C"
    executor_class = CExecutor


class LanguagePython(Language):
    name = "python"
    verbose_name = "Python"
    executor_class = PythonExecutor


class LanguageJS(Language):
    name = "javascript"
    verbose_name = "JavaScript"
    executor_class = JSExecutor


class LanguagePascal(Language):
    name = "pascal"
    verbose_name = "Pascal"
    executor_class = PascalExecutor


def get_all_languages():
    return [LanguagePython, LanguageC, LanguageJS, LanguagePascal]


def get_language_choices():
    return [(lang.name, lang.verbose_name) for lang in get_all_languages()]


def get_language_by_name(name):
    if name == "c":
        return LanguageC
    elif name == "python":
        return LanguagePython
    elif name == "javascript":
        return LanguageJS
    elif name == "pascal":
        return LanguagePascal
