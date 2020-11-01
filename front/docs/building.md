# Описание сборки проекта

Подробное описание как локально собрать проект. В качестве менеджера пакетов используется `NPM`

# Web

Запустить проект можно при помощи команды - `npm run start`

1. Установите зависимости - `npm run install`
2. Соберите проект - `npm run build`

Для локального запуска можно воспользоваться [Serve](https://github.com/vercel/serve) - `npx serve -s build`

# Android

- [Ссылка на скачивание](https://developer.android.com/studio)
- [Инструкция по установке](https://developer.android.com/studio/install)

Для сборки потребуется Android Studio. Первоначально собирите Web проект - `npm run build`

Не забудьте настроить тестовое устройство и добавить необходимые зависимости

1. Добавьте Capacitor плагин - `npx cap add android`
2. Синхронизируйте проект - `npx cap sync`
3. Переместите файлы собранного проекта - `npx cap copy`
4. Откройте проект в Android Studio - `npx cap open`
