import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useStore } from 'effector-react';

import { Guard } from './components/guard';
import { AuthLayout } from './components/auth-layout';
import { PersonalLayout } from './components/personal-layout';
import { Login as LoginPage } from '@/pages/auth/login';
import { Register as RegisterPage } from '@/pages/auth/register';
import { Tasks as TasksPage } from '@/pages/personal/tasks';
import { Task as TaskPage } from '@/pages/personal/task';
import { Board as BoardPage } from '@/pages/personal/board';
import { CreateTask as CreateTaskPage } from '@/pages/personal/create-task';
import { ManageTasks as ManageTasksPage } from '@/pages/personal/manage-tasks';
import { $isAuth } from '@/models/auth';

export const Routes = () => {
  const isAuth = useStore($isAuth);

  return (
    <Switch>
      <Guard
        path="/personal"
        isAuth={isAuth}
        routes={() => (
          <PersonalLayout>
            <Switch>
              <Route path="/personal/board" exact component={BoardPage} />
              <Route path="/personal/tasks" exact component={TasksPage} />
              <Route path="/personal/task/:id" exact component={TaskPage} />
              <Route path="/personal/create-task" exact component={CreateTaskPage} />
              <Route path="/personal/manage-tasks" exact component={ManageTasksPage} />
            </Switch>
          </PersonalLayout>
        )}
      />

      <Route path="/auth">
        <AuthLayout>
          <Switch>
            <Route path="/auth/login" exact component={LoginPage} />
            <Route path="/auth/register" exact component={RegisterPage} />
          </Switch>
        </AuthLayout>
      </Route>

      <Redirect to="/auth/login" />
    </Switch>
  );
};
