### Project Structure

Main structure of node.js project. Folders / files:

- **backend**:
  - **app**:
      - controllers
      - db
      - helpers
      - middlewares
      - models
      - routes
      - app.js. Entry point.
  - package.json


### Project initialization
-node.js and mongodb are required to be installed in the computer, since the .env does not provide an Atlas cluster and the db runs in the local machine.

1. As an exception, the .env was not included in the gitignore so that the user can test the social logins.
2. DO NOT change the ports, since google and github use them so that the authentication works.
3. Use `npm install` command to install packages.
4. Start each project with the `npm start` command

### API Endpoints

The api provides endpoints to handle the authentication to the chat,
while aalso refreshing the token for the current session.

| Method |Common path| Endpoint | Description |
| ------ | ----------| -------- | ----------- |
| POST   | {url} /api/auth | /register  | Checks the provided data against the existing DB and creates a new user if it doesn't exists |
| POST   | {url} /api/auth | /login   | Checks the provided data against the existing DB and provides a token if valid|
| POST   | {url} /api/auth | /google   | Stores a user authenticated with google to the DB |
| GET    | {url} /api/auth | /   | Refreshes the token |
| GET    | {url} /api/users | /   | shows the stored users |