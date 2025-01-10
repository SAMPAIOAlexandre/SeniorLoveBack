# SENIOR LOVE BACKEND

Welcome to Senior Love Backend repository. 
Want to try our API out ? Let's start this journey together ! 💪

## First

```bash
# 1 - Clone the repository into your local environement
git clone git@github.com:O-clock-Quinoa/seniorlove-back.git
cd seniorlove-back/
code .
```

## Set up

```bash
# 1 - Install depedencies
npm i

# 2 - Configure .env
cp .env.example .env

# 3 - Launch server
npm run dev

# Does everything look good on PORT 3000 ?
# 👍 ? Congrats ! You can stop the server.
# 👎 ? Assure you tried to connect from your favorite browser on http://localhost:3000.
# Still stuck ? Assure the path in shell ends by /seniorlov-back. Reapeat from #1.
```

## Initialize DB in your local environment

```bash
# 1 - Connect to Postgres
psql postgres (MacOS) || sudo -u postgres psql (Linux)

# 2 - Create a new ROLE in PostgreSQL
CREATE ROLE <xxxx> WITH LOGIN PASSWORD 'yyyy';

# 3 - Create a new DATABASE in PostgreSQL
CREATE DATABASE <zzzz> OWNER <xxxx>;

# 4 - use \q to quit and return to the shell
```

## Create tables | Populate tables | Reset tables

```bash
## 1 - Create tables
npm run db:create

## 2 - Populate tables
npm run db:populate

## 3 - Or do both in a single command 😏
npm run db:reset
```

## About authentification

This project goes with [JWT](https://jwt.io/).

Into `.env`, you want to configure your **JWT secret** (cf [JWT documentation](https://jwt.io/introduction)).

```shell
JWT_SECRET=your_secret_goes_here
```

*The API will return the browser a token which identifies you as a connected user through providing your ID. You want to find the responsible code in `authController.js`, method **loginUser**.*

## Project structure (V.0)

```text
PROJECT ROOT
├── data
│   ├── create_tables.sql
│   └── seeding_tables.sql
├── public
│   └── css
│       └── styles.css
│   └── js
│       └── adminMethods.js
├── src
│   └── controllers
│      └── utils
│         └── storageService.js
│      ├── adminAuthController.js
│      ├── adminController.js
│      ├── authController.js
│      ├── eventController.js
│      ├── meController.js
│      ├── messageController.js
│      ├── tagController.js
│      ├── testimonyController.js
│      └── usersController.js
│   └── middlewares
│      ├── authenticateAdmin.js
│      └── isLoggedIn.js
│   └── models
│      └── tests
│          ├── event.model.test.js
│          ├── message.model.test.js
│          ├── tag.model.test.js
│          ├── testimony.model.test.js
│          └── users.model.test.js
│      ├── admin.model.js
│      ├── association.js
│      ├── event.model.js
│      ├── index.js
│      ├── message.model.js
│      ├── sequelize-client.js
│      ├── tag.model.js
│      ├── testimony.model.js
│      └── users.model.js
│   └── routers
│      ├── account.router.js
│      ├── admin.index.js
│      ├── adminAuth.router.js
│      ├── auth.router.js
│      ├── controller-wrapper.js
│      ├── event.router.js
│      ├── index.js
│      ├── tag.router.js
│      ├── testimony.router.js
│      └── users.router.js
├── uploads
├── views
│   └── partials
│      ├── footer.ejs
│      ├── header.ejs
│      └── navbar.ejs
│   ├── admins.ejs
│   ├── connexion.ejs
│   ├── dashboard.ejs
│   ├── error.ejs
│   ├── events.ejs
│   └── users.ejs
├── .env.example
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── requests.http (requires REST Client extension)
```

## API Endpoints (V.0)

| Verb | Endpoint | Description |
| --- | --- | --- |
| **AUTH** |
| POST | /api/signup | Register a new user |
| POST | /api/login | Authenticate a user and returns an access token |
| **USERS** |
| GET | /api/users | Return an array of users |
| GET | /api/users/:id | Return one user detail |
| **EVENTS** |
| GET | /api/events | Return an array of events |
| GET | /api/events/:id | Return one event detail |
| **ACCOUNT** |
| GET | /api/me | Return self user's profile |
| PATCH | /api/me | Update self user's profile |
| DELETE | /api/me | Delete self user's profile |
| POST | /api/me/profile_picture | Add a profile picture |
| POST | /api/me/tags/:tagId | Assign a tag to self user's profile |
| POST | /api/me/events/:eventId/event_picture | Add a picture to created event |
| DELETE | /api/me/tags/:tagId | Remove a tag from self user's profile |
| POST | /api/me/events | Register a new event |
| GET | /api/me/events | Return an array of owned events |
| GET | /api/me/events/:eventId | Return one owned event details |
| PATCH | /api/me/events/:eventId | Update one owned event |
| DELETE | /api/me/events/:eventId | Delete one owned event |
| POST | /api/me/events/:eventId/tags/:tagId | Assign a tag to one owned event |
| DELETE | /api/me/events/:eventId/tags/:tagId | Remove a tag from one owned event |
| **TESTIMONY** |
| GET | /api/testimonies | Return all testimonies |