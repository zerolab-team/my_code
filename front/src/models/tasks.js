import { createEffect, forward, createEvent, createStore } from 'effector';

import { get } from '@/utils/api';

export const tasksReceived = createEvent();
export const getTasksFx = createEffect();
export const $tasks = createStore([]);

getTasksFx.use(() => get('tasks/'));

$tasks.on(getTasksFx.doneData, (_, payload) => payload);

forward({ from: tasksReceived, to: getTasksFx });
