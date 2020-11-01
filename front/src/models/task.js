import { createEvent, createStore } from 'effector';

const arrayMutate = (array, from, to) => {
  const startIndex = from < 0 ? array.length + from : from;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = to < 0 ? array.length + to : to;
    const [item] = array.splice(from, 1);

    array.splice(endIndex, 0, item);
  }
};

const arrayMove = (array, from, to) => {
  array = [...array];
  arrayMutate(array, from, to);

  return array;
};

const arrayReorder = (array, index, direction) => {
  const startIndex = index;
  const endIndex = direction === 'up' ? index - 1 : direction === 'down' ? index + 1 : index;

  if (endIndex >= 0) {
    return arrayMove(array, startIndex, endIndex);
  }

  return array;
};

const arrayInsert = (array, index, item) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const createTaskModel = () => {
  const blockAdded = createEvent();
  const blockReplaced = createEvent();
  const blockRemoved = createEvent();
  const blockOrderingChanged = createEvent();
  const creatorAdded = createEvent();
  const creatorRemoved = createEvent();
  const valueChanged = createEvent();
  const $task = createStore([]);

  $task.on(blockAdded, (state, payload) => [...state, payload]);
  $task.on(blockReplaced, (state, { index, item }) => {
    return state.map((stateItem, stateIndex) => (stateIndex === index ? item : stateItem));
  });
  $task.on(blockOrderingChanged, (state, { index, direction }) => {
    return arrayReorder(state, index, direction);
  });
  $task.on(blockRemoved, (state, payload) => state.filter((_, index) => index !== payload));
  $task.on(creatorRemoved, (state, payload) => state.filter((_, index) => index !== payload));
  $task.on(creatorAdded, (state, { index, item }) => arrayInsert(state, index, item));
  $task.on(valueChanged, (state, { index, value }) =>
    state.map((item, idx) => {
      if (index === idx) return { ...item, value };
      return item;
    }),
  );

  return {
    blockAdded,
    blockOrderingChanged,
    blockRemoved,
    blockReplaced,
    creatorAdded,
    creatorRemoved,
    valueChanged,
    $task,
  };
};
