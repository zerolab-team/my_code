import React from 'react';
import styled from 'styled-components';
import { Check } from 'react-feather';

export const StudentsInfoList = ({ list, title, className, checkedList, setCheckedList }) => {
  const handleClickCheckbox = (id) => {
    const inList = checkedList.find((item) => item === id);
    const filteredList = checkedList.filter((item) => item !== id);

    if (inList) setCheckedList(filteredList);
    else {
      setCheckedList([...checkedList, id]);
    }
  };

  return (
    <StyledStudentsInfoList className={className}>
      <p className="name">{title}</p>

      <ul>
        {list.map(({ id, full_name }, index) => {
          const isChecked = checkedList.find((item) => item === id);

          return (
            <li key={index}>
              <p>{full_name}</p>

              <button className="checker" type="button" onClick={() => handleClickCheckbox(id)}>
                {isChecked ? <Check strokeWidth="2px" width="16px" /> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </StyledStudentsInfoList>
  );
};

const StyledStudentsInfoList = styled.div`
  > p {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 16px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    min-height: 54px;
    padding: 6px 16px;

    &:not(:last-of-type) {
      margin-bottom: 14px;
    }
  }

  .name {
    margin-right: 12px;
  }

  .checker {
    width: 24px;
    height: 24px;
    border: 2px solid #828282;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #27ae60;
  }
`;
