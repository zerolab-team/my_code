import React from 'react';
import styled from 'styled-components';

export const ClassTable = ({ header, body }) => {
  return (
    <StyledClassTable>
      <thead>
        <tr>
          <th>Ученик</th>

          {header.map((cell, index) => (
            <th key={index}>{cell}</th>
          ))}
        </tr>

        <th>Сумма</th>
      </thead>

      <tbody>
        {body.map((row, index) => (
          <tr key={index}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledClassTable>
  );
};

const StyledClassTable = styled.table``;
