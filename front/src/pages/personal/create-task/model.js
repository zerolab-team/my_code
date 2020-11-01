import { createEffect, forward, createEvent, createStore } from 'effector';

import { post } from '@/utils/api';

// Code

export const codeChanged = createEvent();
export const $code = createStore(null);

$code.on(codeChanged, (_, value) => value);

// Task

export const taskCreated = createEvent();
export const createTaskFx = createEffect();
export const $identifier = createStore(null);

createTaskFx.use((data) => post('tasks/', data));

$identifier.on(createTaskFx.doneData, (_, { id }) => id);

forward({ from: taskCreated, to: createTaskFx });

// Code tests

export const codeTestCreated = createEvent();
export const createCodeTestFx = createEffect();

createCodeTestFx.use((data) => {
  if ($code.getState()) {
    post(`tasks/${$identifier.getState()}/check_tests/`, { code: $code.getState(), ...data });
  }
});

forward({ from: codeTestCreated, to: createCodeTestFx });

// Table tests

export const tableTestCreated = createEvent();
export const tableUpdated = createEvent();
export const tableTestAdded = createEvent();
export const createTableTestFx = createEffect();
export const $table = createStore([]);

createTableTestFx.use(() => {
  if ($table.getState().length) {
    $table.getState().map((table) => post(`tasks/${$identifier.getState()}/in_out_tests/`, table));
  }
});

$table.on(tableUpdated, (state, payload) => {
  const tests = state.map((test, index) => {
    if (index === payload.index) return { ...test, [payload.name]: payload.value };
    return test;
  });

  return tests;
});
$table.on(tableTestAdded, (state) => [...state, { data_in: '', data_out: '' }]);

forward({ from: tableTestCreated, to: createTableTestFx });
