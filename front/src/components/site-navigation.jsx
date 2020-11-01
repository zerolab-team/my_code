import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Trello, Monitor, MessageSquare, Archive } from 'react-feather';
import { useStore } from 'effector-react';

import { $role } from '@/models/user';

const studentNavList = [
  { to: '/personal/tasks', name: 'Задачи', icon: <Archive strokeWidth="1.5px" width="20px" /> },
  {
    to: '/personal/messenger',
    name: 'Чат',
    icon: <MessageSquare strokeWidth="1.5px" width="20px" />,
  },
];

const adminNavList = [
  {
    to: '/personal/board',
    name: 'Доска',
    icon: <Trello strokeWidth="1.5px" width="20px" />,
  },
  {
    to: '/personal/manage-tasks',
    name: 'Управление задачами',
    icon: <Monitor strokeWidth="1.5px" width="20px" />,
  },
  {
    to: '/personal/messenger',
    name: 'Чат',
    icon: <MessageSquare strokeWidth="1.5px" width="20px" />,
  },
];

export const SiteNavigation = ({ className }) => {
  const role = useStore($role);

  const navList = role === 'student' ? studentNavList : adminNavList;

  const checkActive = (url) => (_, location) => {
    if (url === location.pathname) return true;
  };

  return (
    <StyledSiteNavigation className={className}>
      <ul className="nav-list">
        {navList.map(({ to, name, icon }) => (
          <li key={to}>
            <NavLink to={to} isActive={checkActive(to)}>
              {icon}

              <p>{name}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </StyledSiteNavigation>
  );
};

const StyledSiteNavigation = styled.nav`
  .nav-list {
    display: flex;
    flex-direction: column;

    > li {
      &:not(:last-of-type) {
        margin-bottom: 24px;
      }

      svg {
        margin-right: 10px;
      }

      a {
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
      }

      .active {
        color: var(--color-blue-ribbon);
      }
    }
  }
`;
