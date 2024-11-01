# Test Web Server

Тестовый Web Server

* [Что умеет](#options)
* [Структура проекта](#structure)
* [Как запустить](#run)
__________
## Что умеет <a id="options" name="options"></a>
- Логиниться по паролю (пользователь должен уже быть в БД)
- Менять пароль пользователя
- Получать список предметов
- Покупать предметы
__________
## Структура проекта <a id="structure" name="structure"></a>
```
src
├── app
│   └── app.ts
├── config
│   └── db.ts
├── constants.ts
├── controllers
│   ├── items.controller.ts
│   ├── purchases.controller.ts
│   └── user.controller.ts
├── index.ts
├── queries
│   ├── items.queries.ts
│   ├── purchases.queries.ts
│   └── user.queries.ts
├── routes
│   ├── items
│   │   └── items.route.ts
│   ├── purchases
│   │   └── purchases.route.ts
│   └── user
│       └── user.route.ts
└── types
    ├── items
    │   └── items.controller.types.ts
    ├── purchases
    │   └── purchases.controller.types.ts
    └── user
        ├── user.controller.types.ts
        └── user.model.types.ts
```

__________
## Как запустить? (dev-режим) <a id="run" name="run"></a>
Пререквизит: 
a. Необходима установленная БД postgres
б. В эту бд необходимо добавить таблицы из файла schema.sql

После того, как пререквизить выполнен, можно пререходить к запуску проекта:
1. Ставим зависимости (``npm install``)
3. Добавляем .env файл со структурой:
````
    ├──DB_USER
    ├──DB_HOST
    ├──DB_NAME
    ├──DB_PASSWORD
    ├──DB_PORT
    └──ENTRY_PASSWORD
````
2. Запускаем приложение .
    - В режиме разработчика `npm run dev`
    - В обычном режиме `npm run start`