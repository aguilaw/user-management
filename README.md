# Maiven User Management

A simple tool that manages users and facilitates messages between them via simulated email notifications

## To Run Locally

1. clone repo
2. run `npm install` in both /spa and /api directories
3. run `npm run build` in both /spa and /api directories
4. run `docker compose up --build` to start the postgres DB, vite SPA and nest.js API services

## Using the APP

The app will start up at `http://localhost:5173` with a register screen. All other routes need authentication.

There are only 3 routes:

- **/register** - started out as the register form but evolved to include the login form. (should be refactored to reflect that)
- **/** - home page. Displays all users with send message/delete functionality
- **/users/:id** - accessible through the "my messages" button on the homepage. It displays all the sent and received messages for this user ID.
- **/\*** - for everything else. essentially a 404

## Notes

- Users are authenticated via a JWT token saved to local storage. The logged in user data is extracted from it.
- both spa routes and api routes should need authentication
- the delete api endpoint soft deletes users. There is no particular reason except that it felt wrong to delete users from the db. However, now that the users/messages relationships are set up in the entity cascading delete should be straight forward.
- the existing test are created by default and may not run. However I left them in to revisit at a later date.
- Docker was added to easily start the app however I had trouble getting the hot reload to work. For dev work, fall back to the terminal and run the appropriate dev commands. In this case the api and spa services in docker can be stopped but the postgres one should still work.

## TODO

It was fun to try a new framework but I had to time box this project, which left a few things undeveloped. The happy path should work for all interactions, but there are many edge cases that still need attention.

A big one is error handling; Most noticeable in the registration/login forms. There is basic feedback for invalid values but not for incorrect credentials of invalid emails addresses. (the spa does not check email values because regex is gross, however the api has an easy implementation for this and will throw an error.)

Part of the requirement was to simulate an email and the app does this by saving the messages to the database. However, it would have been nice to add some type of alert to communicate that in the spa.

There are a few things that I would like to break out into utils or simply configurations outside of the react components. For example, a global axios config that only has to define the api url once or even an API class that has methods like getAllUsers() instead of writing out the full axios request every time. This repo has now become my nest.js sandbox so I might get to it someday.
