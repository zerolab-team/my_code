import { createStore, createEvent } from 'effector';

import { setLocalStorage } from '../utils/storage';
import { toggleDarkTheme, getTheme } from '../utils/theme';

const initialTheme = getTheme();

export const themeChanged = createEvent();
export const $theme = createStore(initialTheme);

$theme.on(themeChanged, (state) => {
  switch (state) {
    case 'light':
      return 'dark';
    case 'dark':
      return 'light';
    default:
      return 'light';
  }
});

$theme.watch((state) => {
  toggleDarkTheme(state === 'dark');
  setLocalStorage('theme', state);
});
