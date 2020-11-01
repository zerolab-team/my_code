import { createEffect, forward, createEvent, createStore } from 'effector';

import { api, get } from '@/utils/api';
import { getLocalStorage } from '@/utils/storage';

const token = getLocalStorage('token');

// Get task

export const taskReceived = createEvent();
export const getTaskFx = createEffect();
export const $task = createStore({});

getTaskFx.use((id) => get(`student/assign_tasks/${id}/`));

$task.on(getTaskFx.doneData, (_, payload) => payload);

forward({ from: taskReceived, to: getTaskFx });

// Send code (text or file)

export const fileSent = createEvent();
export const sendFileFx = createEffect();

sendFileFx.use(({ formData, id }) => {
  return fetch(`${api}student/assign_tasks/${id}/send_dispatch/`, {
    method: 'POST',
    body: formData,
    headers: { Authorization: `Token ${token}` },
  });
});

forward({ from: fileSent, to: sendFileFx });

// Get dispatches

export const dispatchesReceived = createEvent();
export const getDispatchesFx = createEffect();
export const $dispatches = createStore([]);

getDispatchesFx.use((id) => get(`student/assign_tasks/${id}/dispatches/`));

$dispatches.on(getDispatchesFx.doneData, (_, payload) => payload);

forward({ from: dispatchesReceived, to: getDispatchesFx });

// Get dispatch

export const dispatchReceived = createEvent();
export const getDispatchFx = createEffect();
export const $dispatch = createStore({});

getDispatchFx.use(({ id, pk }) => get(`student/assign_tasks/${id}/dispatches/${pk}/`));

$dispatch.on(getDispatchFx.doneData, (_, payload) => payload);

forward({ from: dispatchReceived, to: getDispatchFx });
