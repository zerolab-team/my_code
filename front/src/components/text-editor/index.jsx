import React from 'react';
import styled from 'styled-components';
import { useStore, useList } from 'effector-react';

import { Creator } from './components/creator';
import { BlockItem } from './components/block-item';
import { CreatorItem } from './components/creator-item';
import { createTaskModel } from '../../models/task';

const {
  $task,
  blockAdded,
  blockOrderingChanged,
  blockRemoved,
  blockReplaced,
  creatorAdded,
  creatorRemoved,
  valueChanged,
} = createTaskModel();

export { $task };

export const TextEditor = ({ className }) => {
  const task = useStore($task);

  const list = useList($task, ({ type, content, value }, index) => {
    if (type === 'block') {
      return (
        <BlockItem
          content={content}
          onAddClick={() =>
            creatorAdded({
              index,
              item: { type: 'creator' },
            })
          }
          onUpClick={() => blockOrderingChanged({ index, direction: 'up' })}
          onDownClick={() => blockOrderingChanged({ index, direction: 'down' })}
          onRemoveClick={() => blockRemoved(index)}
          isFirst={index === 0 && task?.[index]?.type === 'block'}
          value={value}
          onChange={valueChanged}
          index={index}
        />
      );
    }

    if (type === 'creator') {
      return (
        <CreatorItem
          isFirst={index === 0 && task?.[index]?.type === 'creator'}
          onCloseClick={() => creatorRemoved(index)}
          index={index}
          task={task}
          onCreateClick={blockReplaced}
          onValueChange={valueChanged}
        />
      );
    }

    return null;
  });

  return (
    <StyledTextEditor className={className}>
      {task.length ? list : <p>Создайте описание задания</p>}

      <Creator onClick={blockAdded} isButtonVisible={task.length === 0} />
    </StyledTextEditor>
  );
};

const StyledTextEditor = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: -14px;
  height: 100%;
  overflow-y: auto;
  padding-right: 14px;

  > p {
    margin-top: 6px;
  }
`;
