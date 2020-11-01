import { getLocalStorage } from './storage';

export const api = 'https://lct.laitprojects.site/api/';

export const request = async (method, url, data) => {
  const token = getLocalStorage('token');

  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    headers: token ? { ...headers, Authorization: `Token ${token}` } : headers,
    method: method.toUpperCase(),
    body: data ? JSON.stringify(data) : null,
  };

  const response = await fetch(`${api}${url}`, options);

  if (response.ok) {
    const string = await response.text();
    const json = string === '' ? {} : JSON.parse(string);

    return json;
  }

  throw await response.json();
};

export const get = (url, options) => request('get', url, null, options);
export const post = (url, body, options) => request('post', url, body, options);
export const put = (url, body, options) => request('put', url, body, options);
export const del = (url, options) => request('del', url, null, options);
export const patch = (url, body, options) => request('patch', url, body, options);
