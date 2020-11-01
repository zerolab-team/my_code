import { createEffect, forward, createEvent, createStore } from 'effector';

import { get, post } from '@/utils/api';

// Students

export const studentsReceived = createEvent();
export const getStudentsFx = createEffect();
export const $students = createStore([]);

getStudentsFx.use(() => get('students/'));

$students.on(getStudentsFx.doneData, (_, payload) => payload);

forward({ from: studentsReceived, to: getStudentsFx });

// Current student

export const studentReceived = createEvent();
export const getCurrentStudentFx = createEffect();

getCurrentStudentFx.use(({ data, id }) => get(`students/${id}/`, data));

forward({ from: studentReceived, to: getCurrentStudentFx });

// Assign tasks

export const taskAssigned = createEvent();
export const assignTaskFx = createEffect();

assignTaskFx.use((data) => post('assign-tasks/', data));

forward({ from: taskAssigned, to: assignTaskFx });
