import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

import { Form } from '../components/form';
import { LabeledField } from '../components/labeled-field';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';
import { $token } from '@/models/auth';
import { $role } from '@/models/user';
import { userLogged } from './model';

export const Login = () => {
  const isAuth = useStore($token);
  const role = useStore($role);
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => userLogged(data);

  useEffect(() => {
    if (isAuth) {
      if (role === 'student') history.push('/personal/tasks');
      if (role === 'teacher' || role === 'admin') history.push('/personal/board');
    }
  }, [history, isAuth, role]);

  return (
    <StyledLogin>
      <Meta name="login" />

      <Container>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title="Авторизация"
          button="Авторизоваться"
          linkText="Зарегистрироваться"
          linkUrl="/auth/register"
        >
          <div className="fields">
            <LabeledField name="username" ref={register} label="Логин" className="labeled-field" />
            <LabeledField
              name="password"
              type="password"
              ref={register}
              label="Пароль"
              className="labeled-field"
            />
          </div>
        </Form>
      </Container>
    </StyledLogin>
  );
};

const StyledLogin = styled.div`
  .labeled-field {
    &:not(:last-of-type) {
      margin-bottom: 15px;
    }
  }

  .fields {
    margin-bottom: 24px;
    width: 100%;
  }
`;
