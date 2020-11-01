import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'react-feather';

import { TaskBlock } from '@/components/task-block';
import { MultiCollapser } from '@/components/multi-collapser';
import { $assignTasks, assignTasksReceived } from '@/models/assignTasks';
import { $role } from '@/models/user';

export const Tasks = () => {
  const assignTasks = useStore($assignTasks);
  const role = useStore($role);

  useEffect(() => {
    if (role === 'student') {
      assignTasksReceived();
    }
  }, [role]);

  return (
    <StyledTasks>
      <MultiCollapser className="collapser" title="Задачи" count={assignTasks.length}>
        {assignTasks.length ? (
          assignTasks.map(({ id, name, task }, index) => (
            <TaskBlock
              className="task-block"
              key={index}
              title={task.name}
              grid="calc(100% - 60px) 60px"
              left={<Link to={`/personal/task/${id}`}>Начать</Link>}
              right={
                <Link to="/personal/messenger">
                  <MessageCircle strokeWidth="2px" width="18px" />
                </Link>
              }
            ></TaskBlock>
          ))
        ) : (
          <p>Нет задач</p>
        )}
      </MultiCollapser>
    </StyledTasks>
  );
};

const StyledTasks = styled.div`
  .collapser {
    .collapser-header {
      margin-left: 20px;
      margin-right: 20px;
    }

    .collapser-content {
      display: flex;
      padding-left: 20px;
    }
  }

  .task-block {
    margin-right: 20px;
  }
`;
