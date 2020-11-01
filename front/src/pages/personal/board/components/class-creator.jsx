import React from 'react';
import styled from 'styled-components';
import { Plus } from 'react-feather';

export const ClassCreator = ({ className }) => {
  return (
    <StyledClassCreator>
      <p>Создать класс</p>

      <button type="button">
        <Plus strokeWidth="1.5px" width="24px" />
      </button>
    </StyledClassCreator>
  );
};

const StyledClassCreator = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 4px 18px;
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #2f80ed;
  margin-top: 18px;

  button {
    color: #2f80ed;
  }
`;
