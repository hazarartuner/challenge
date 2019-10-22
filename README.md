## Challenge
This is one of my challenge project. It is structured as monorepo which consists of two packages; `api` (for restful api) and `web` (web application).

`Status: api package is ready for use, web application is not fully complete.`

## Setup

Clone the repo

```bash
git clone https://github.com/hazarartuner/challenge
```

If you dont have YARN, follow this link to setup
[Yarn installation guide link](https://yarnpkg.com/en/docs/getting-started)

Install root dependencies with yarn

```bash
cd challenge
yarn install
```

**Create `.env` file from `.env.sample` file**

```bash
cp .env.sample .env
```

**Sample .env config**

```dotenv
# Web
WEB_PORT=3000 ## Web application port

# Api
API_HOST=http://localhost
API_PORT=9000

# Database
DB_HOST=localhost
DB_USER=user
DB_PASSWORD=password
DB_NAME=db_name
```

## DB Setup
**Create database schema**
```bash
cd workspaces/api/
yarn run model:sync
```

If you want to force update, use the command below. **Be careful,** this command will completely remove and re-create the existing tables of the connected database
```bash
yarn run model:sync --force
```

## Start Api Service:
Go to root directory of your repo. Then run the command below
```bash
yarn run start:api
```

## Start Web Application:
Go to root directory of your repo. Then run the command below
```bash
yarn run start:web
```

