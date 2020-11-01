import { createStore, createEvent } from 'effector';

import { setLocalStorage, getLocalStorage } from '../utils/storage';

const token = getLocalStorage('token');

export const loggedOut = createEvent();
export const $token = createStore(token || null);
export const $isAuth = $token.map(Boolean);

$token.on(loggedOut, () => null);
$token.watch((token) => setLocalStorage('token', token));
