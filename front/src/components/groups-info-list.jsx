import React from 'react';
import styled from 'styled-components';
import { Check } from 'react-feather';

export const GroupsInfoList = ({ list, title, className, checkedList, setCheckedList }) => {
  const handleClickCheckbox = (name) => {
    const inList = checkedList.find((item) => item === name);
    const filteredList = checkedList.filter((item) => item !== name);

    if (inList) setCheckedList(filteredList);
    else {
      setCheckedList([...checkedList, name]);
    }
  };

  return (
    <StyledGroupsInfoList className={className}>
      <p className="name">{title}</p>

      <ul>
        {list.map(({ name }, index) => {
          const isChecked = checkedList.find((item) => item === name);

          return (
            <li key={index}>
              <p>{name}</p>

              <button className="checker" type="button" onClick={() => handleClickCheckbox(name)}>
                {isChecked ? <Check strokeWidth="2px" width="16px" /> : null}
              </button>
            </li>
          );
        })}
      </ul>
    </StyledGroupsInfoList>
  );
};

const StyledGroupsInfoList = styled.div`
  margin-bottom: 24px;

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
