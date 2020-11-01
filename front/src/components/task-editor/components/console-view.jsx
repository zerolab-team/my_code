import React from 'react';
import styled from 'styled-components';

import { ToggledConsole } from '../../toggled-console';

export const ConsoleView = ({ value, height, isOpen }) => {
  return <StyledToggledConsole height={height} value={value} isConsoleOpen={isOpen} />;
};

const StyledToggledConsole = styled(ToggledConsole)``;
