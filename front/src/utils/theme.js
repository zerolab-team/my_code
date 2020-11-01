import { getLocalStorage } from './storage';

const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
const prefersTheme = prefersDarkTheme.matches ? 'dark' : 'light';

export const getTheme = () => getLocalStorage('theme') || prefersTheme;

export const toggleDarkTheme = (isChecked) => {
  document.body.classList.toggle('dark', isChecked);
};

prefersDarkTheme.addEventListener('change', (event) => {
  toggleDarkTheme(event.matches);
});
