import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Form = ({ children, onSubmit, title, button, linkUrl, linkText }) => {
  return (
    <StyledForm onSubmit={onSubmit}>
      <h1 className="title">{title}</h1>

      {children}

      <button className="submit-btn" type="submit">
        {button}
      </button>

      <Link className="forward-link" to={linkUrl}>
        {linkText}
      </Link>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  background-color: var(--auth-form-bg-color);
  max-width: 420px;
  padding: 30px 20px;
  border-radius: 20px;
  width: 100%;
  box-shadow: 0 3px 15px -3px var(--editor-box-shadow-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;

  .title {
    margin-bottom: 36px;
    font-weight: 500;
    font-size: 20px;
  }

  .submit-btn {
    border-radius: 10px;
    min-height: 42px;
    color: var(--color-set-2);
    margin-bottom: 23px;
    background-color: var(--color-blue-ribbon);
    padding: 0 18px;
    width: 100%;
  }

  .forward-link {
    color: var(--color-blue-ribbon);
  }
`;
