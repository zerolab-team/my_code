import { createEffect, forward, createEvent } from 'effector';

import { post } from '@/utils/api';
import { $token } from '@/models/auth';
import { userInfoReceived } from '@/models/user';

export const userLogged = createEvent();
export const userLoginFx = createEffect();

userLoginFx.use((data) => post('users/login/', data));
userLoginFx.finally.watch(() => userInfoReceived());

forward({
  from: userLogged,
  to: userLoginFx,
});

$token.on(userLoginFx.doneData, (_, { token }) => token);
