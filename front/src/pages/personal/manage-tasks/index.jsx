import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, Settings, UserPlus } from 'react-feather';
import { Link } from 'react-router-dom';
import { useStore } from 'effector-react';

import { StudentsInfoList } from '@/components/students-info-list';
import { GroupsInfoList } from '@/components/groups-info-list';
import { TaskBlock } from '@/components/task-block';
import { CustomModal } from '@/components/custom-modal';
import { MultiCollapser } from '@/components/multi-collapser';
import { Meta } from '@/components/meta';
import { PageTabs } from '@/components/page-tabs';
import { $tasks, tasksReceived } from '@/models/tasks';
import { $role } from '@/models/user';
import { $students, studentsReceived, taskAssigned } from '@/models/students';
import { groupsReceived, $groups } from '@/models/groups';

const tabs = [
  {
    text: 'Доска учеников',
    isActive: false,
    url: '/personal/board',
  },
  {
    text: 'Задания',
    isActive: true,
    url: '/personal/manage-tasks',
  },
];

export const ManageTasks = () => {
  const tasks = useStore($tasks);
  const role = useStore($role);
  const students = useStore($students);
  const groups = useStore($groups);

  const [selectedTask, setSelectedTask] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [groupsList, setGroupsList] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(!isOpen), [isOpen]);

  useEffect(() => {
    if (role === 'teacher' || role === 'admin') {
      tasksReceived();
      studentsReceived();
    }
  }, [role]);

  useEffect(() => {
    groupsReceived();
  }, []);

  const handleTaskClick = (id) => {
    setSelectedTask(id);
    toggleOpen();
  };

  const handleSaveTasks = () => {
    taskAssigned({ students: studentsList, tasks: [selectedTask], groups: [] });
  };

  return (
    <Fragment>
      <StyledManageTasks>
        <Meta name="manage-tasks" />

        <PageTabs
          tabs={tabs}
          backdropColor="#1976d2"
          color="var(--color-white)"
          className="page-tabs"
        />

        <MultiCollapser
          className="collapser"
          title="Задачи"
          count={tasks.length}
          actions={
            <div className="manage-actions">
              <button type="button">
                <Trash2 strokeWidth="2px" width="22px" />
              </button>
              <button type="button">
                <Settings strokeWidth="2px" width="22px" />
              </button>
            </div>
          }
        >
          {tasks.length ? (
            tasks.map(({ id, name }, index) => (
              <TaskBlock
                className="task-block"
                key={index}
                title={name}
                grid="calc(100% - 120px) 120px"
                left={<Link to={`/personal/task/${id}`}>Редактировать</Link>}
                right={
                  <div className="buttons">
                    <button type="button" onClick={() => handleTaskClick(id)}>
                      <UserPlus strokeWidth="2px" width="18px" />
                    </button>
                    <button type="button">
                      <Trash2 strokeWidth="2px" width="18px" />
                    </button>
                  </div>
                }
              />
            ))
          ) : (
            <p>Нет задач</p>
          )}
        </MultiCollapser>

        <div className="create-block">
          <Link to="/personal/create-task" className="create-link">
            <Plus strokeWidth="0.5px" width="110px" height="110px" />
          </Link>
        </div>
      </StyledManageTasks>

      <CustomModal isOpen={isOpen} onToggle={toggleOpen}>
        <GroupsInfoList
          title="Классы"
          list={groups}
          checkedList={groupsList}
          setCheckedList={setGroupsList}
        />

        <StudentsInfoList
          title="Ученики"
          list={students}
          checkedList={studentsList}
          setCheckedList={setStudentsList}
        />

        <StyledButtons>
          <button type="button" onClick={handleSaveTasks}>
            Сохранить
          </button>

          <button type="button" onClick={toggleOpen}>
            Отменить
          </button>
        </StyledButtons>
      </CustomModal>
    </Fragment>
  );
};

const StyledManageTasks = styled.div`
  .page-tabs {
    margin-bottom: 40px;
    margin-left: 20px;
  }

  .create-block {
    margin-top: 40px;
  }

  .create-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 330px;
    height: 205px;
    border: 1px solid #d5d5dc;
    border-radius: 20px;
    margin-left: 20px;
  }

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

  .manage-actions {
    button {
      color: #1976d2;
    }

    button:not(:last-of-type) {
      margin-right: 12px;
    }
  }

  .buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 100%;

    button {
      height: 100%;
      color: var(--color-white);

      &:first-of-type {
        background-color: #27ae60;
      }

      &:last-of-type {
        background-color: #eb5757;
      }
    }
  }
`;

const StyledButtons = styled.div`
  button {
    margin-top: 24px;
    padding: 6px 8px;
    background-color: var(--color-set-4);
    border-radius: 6px;

    &:not(:last-of-type) {
      margin-right: 10px;
    }
  }
`;
