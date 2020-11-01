import { createEvent } from 'effector';

import { createTaskModel } from '../task';

const { $task, blockAdded, blockRemoved, blockOrderingChanged } = createTaskModel();

const resetTask = createEvent();

beforeAll(() => $task.reset(resetTask));

describe('task model', () => {
  test('event blockAdded should add a block to store', () => {
    resetTask();
    [...Array(2).keys()].map(blockAdded);
    expect($task.getState()).toEqual([0, 1]);
  });

  test('event blockRemoved should remove a block by index from store', () => {
    resetTask();
    [...Array(3).keys()].map(blockAdded);
    expect($task.getState()).toEqual([0, 1, 2]);
    blockRemoved(1);
    expect($task.getState()).toEqual([0, 2]);
  });

  test('event blockOrderingChanged should change a block ordering in store', () => {
    resetTask();
    [...Array(5).keys()].map(blockAdded);
    expect($task.getState()).toEqual([0, 1, 2, 3, 4]);
    blockOrderingChanged({ index: 2, direction: 'up' });
    expect($task.getState()).toEqual([0, 2, 1, 3, 4]);
    blockOrderingChanged({ index: 0, direction: 'down' });
    blockOrderingChanged({ index: 1, direction: 'down' });
    expect($task.getState()).toEqual([2, 1, 0, 3, 4]);
  });

  test('event blockOrderingChanged should change a block ordering in store without boundaries crossings', () => {
    resetTask();
    [...Array(3).keys()].map(blockAdded);
    expect($task.getState()).toEqual([0, 1, 2]);
    blockOrderingChanged({ index: 0, direction: 'up' });
    expect($task.getState()).toEqual([0, 1, 2]);
    blockOrderingChanged({ index: 2, direction: 'down' });
    expect($task.getState()).toEqual([0, 1, 2]);
  });
});
