import React from 'react';
import styled from 'styled-components';

export const TestTable = ({ tests, setTests, addTests }) => {
  const handleTestChange = (event, index, name) => {
    const value = event.target.value;

    setTests({ value, index, name });
  };

  const handleAddClick = () => {
    addTests();
  };

  return (
    <StyledTestTable>
      <table>
        <thead>
          <tr>
            <th className="count-cell">№</th>
            <th>Входные данные</th>
            <th>Выходные данные</th>
          </tr>
        </thead>

        <tbody>
          {tests.map(({ data_in, data_out }, index) => (
            <tr key={index}>
              <td className="count-cell">{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={data_in}
                  onChange={(event) => handleTestChange(event, index, 'data_in')}
                />
              </td>

              <td>
                <input
                  type="text"
                  value={data_out}
                  onChange={(event) => handleTestChange(event, index, 'data_out')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-test" type="button" onClick={handleAddClick}>
        Добавить данные
      </button>
    </StyledTestTable>
  );
};

const StyledTestTable = styled.div`
  table {
    width: 100%;
    border-bottom: 1px solid var(--color-set-5);
  }

  .count-cell {
    text-align: center;
    width: 60px;
  }

  td,
  th {
    padding: 0;
    border: 1px solid var(--color-set-5);
    height: 35px;

    input {
      width: 100%;
      height: 100%;
      border: none;
      padding: 0 6px;
    }
  }

  .add-test {
    margin-top: 14px;
    padding: 6px 8px;
    background-color: var(--color-set-4);
    border-radius: 6px;
  }
`;
