import { createStore, createEvent } from 'effector';

export const menuOpened = createEvent();
export const menuClosed = createEvent();
export const menuToggled = createEvent();
export const $menu = createStore(false);

$menu.on(menuOpened, () => true);
$menu.on(menuClosed, () => false);
$menu.on(menuToggled, (state) => !state);
