# Test Web Server

* [Functiononality](#options)
* [Project structure](#structure)
* [How to start](#run)
__________
## Functiononality <a id="options" name="options"></a>
- Log in with a password (the user must already be in the database)
- Change the user's password
- Get a list of items
- Buy items
__________
## Project structure <a id="structure" name="structure"></a>
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
## How to start? (dev-mode) <a id="run" name="run"></a>
Prerequisites: 
a. An installed postgres database is required.
b. Tables from the schema.sql file must be added to this database.

After the prerequisite is completed, you can proceed to the launch of the project:
1. Install the dependencies (`npm install")
3. Add the .env file with the structure:
````
    ├──DB_USER
    ├──DB_HOST
    ├──DB_NAME
    ├──DB_PASSWORD
    ├──DB_PORT
    └──ENTRY_PASSWORD
````
2. Launch the app.
    - In dev mode `npm run dev`
    - In default mode `npm run start`
