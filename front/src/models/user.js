import { createEffect, forward, createEvent, createStore } from 'effector';

import { get } from '@/utils/api';

export const userInfoReceived = createEvent();
export const getUserInfoFx = createEffect();
export const $user = createStore({
  full_name: null,
  role: null,
});
export const $role = $user.map(({ role }) => role);

getUserInfoFx.use(() => get('users/me/'));

$user.on(getUserInfoFx.doneData, (_, payload) => payload);

forward({ from: userInfoReceived, to: getUserInfoFx });
