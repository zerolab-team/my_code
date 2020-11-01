import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { Form } from '../components/form';
import { LabeledField } from '../components/labeled-field';
import { Meta } from '@/components/meta';
import { Container } from '@/components/container';

export const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <StyledRegister>
      <Meta name="register" />

      <Container>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          title="Регистрация"
          button="Зарегистрироваться"
          linkText="Авторизоваться"
          linkUrl="/auth/login"
        >
          <div className="fields">
            <LabeledField name="username" ref={register} label="ФИО" className="labeled-field" />
            <LabeledField
              name="birthday"
              ref={register}
              label="Дата рождения"
              className="labeled-field"
            />
            <LabeledField
              name="educationOrganization"
              ref={register}
              label="Образовательная организация"
              className="labeled-field"
            />
            <LabeledField
              name="email"
              ref={register}
              label="Адрес эл. почты"
              className="labeled-field"
            />
            <LabeledField name="login" ref={register} label="Логин" className="labeled-field" />
            <LabeledField
              name="password"
              type="password"
              ref={register}
              label="Пароль"
              className="labeled-field"
            />
            <LabeledField
              name="repeatedPassword"
              type="password"
              ref={register}
              label="Повторите пароль"
              className="labeled-field"
            />
          </div>
        </Form>
      </Container>
    </StyledRegister>
  );
};

const StyledRegister = styled.div`
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
