import { createEffect, forward, createEvent, createStore } from 'effector';

import { get } from '@/utils/api';

export const groupsReceived = createEvent();
export const getGroupsFx = createEffect();
export const $groups = createStore([]);

getGroupsFx.use(() => get('groups/'));

$groups.on(getGroupsFx.doneData, (_, payload) => payload);
$groups.watch(console.log);

forward({ from: groupsReceived, to: getGroupsFx });
