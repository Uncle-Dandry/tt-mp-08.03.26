# Test Task

React admin-style приложение для авторизации и работы со списком товаров.

## Stack

- React 19
- TypeScript strict
- Vite
- React Router
- TanStack Query
- React Hook Form + Zod
- Mantine
- SCSS Modules
- Axios

## Features

- авторизация через DummyJSON Auth
- remember me через `localStorage` / `sessionStorage`
- список товаров через DummyJSON Products
- API search
- сортировка по таблице
- локальное добавление товара через модалку (локально добавляется в начало таблицы и по клику по рефреш кнопке удаляется)
- success toast
- рейтинг ниже `3` подсвечивается
- initial progress bar сделан только при первой загрузке
- при последующих refetch старые данные сохраняются
- адаптивный desktop-first layout с горизонтальным скроллом таблицы на узких экранах

Директории организованы по FSD
  src/
    app/
    pages/
    widgets/
    features/
    entities/
    shared/

## Authentication

- при включенном remember me -> localStorage
- при выключенном -> sessionStorage
- logout очищает обе storage

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## DTO Types

DTO-типы поддерживаются вручную в файлах (изначало сгенерированы):

- `src/shared/api/generated/auth-login.dto.ts`
- `src/shared/api/generated/product.dto.ts`
- `src/shared/api/generated/products-response.dto.ts`

## AI Disclosure

При подготовке проекта использовалась модель `chat gpt-5.4`.

Что использовалось (промпты):

- помощь в формализации DTO-типов на основе примеров API-ответов
- помощь в формулировке и структурировании README
- помощь в декомпозиции компонентов
- генерация лого иконок в нужные форматы
