import { createEffect, forward, createEvent, createStore } from 'effector';

import { get } from '@/utils/api';

export const assignTasksReceived = createEvent();
export const getAssignTasksFx = createEffect();
export const $assignTasks = createStore([]);

getAssignTasksFx.use(() => get('student/assign_tasks/'));

$assignTasks.on(getAssignTasksFx.doneData, (_, payload) => payload);

forward({ from: assignTasksReceived, to: getAssignTasksFx });
