import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { useStore } from 'effector-react';

import { $theme } from '../models/theme';

export const tooltips = [
  {
    id: 'task-paragraph-button',
    text: 'Параграф',
  },
];

export const Tooltips = () => {
  const theme = useStore($theme);

  const type = theme === 'light' ? 'dark' : 'light';

  return (
    <Fragment>
      {tooltips.map(({ id, text }) => (
        <StyledReactTooltip id={id} effect="solid" type={type} key={id}>
          {text}
        </StyledReactTooltip>
      ))}
    </Fragment>
  );
};

const StyledReactTooltip = styled(ReactTooltip)`
  padding: 6px 12px;
`;
