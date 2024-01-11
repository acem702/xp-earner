# XP-Earner

1. [Description](#description)
2. [Core Features](#core-features)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup Instructions](#installation-and-setup-instructions)
5. [API Documentation](#api-documentation)
    1. [Auth Routes](#auth-routes)
    2. [User Routes](#user-routes)
    3. [Task Routes](#task-routes)
6. [ERD](#erd)

## Description

This is a simple app that allows users to complete tasks and earn experience points(XP) for each task completed.

## Core Features

-   Users can create an account and login
-   Users complete tasks and earn XP
-   Users can view their profile and see their XP
-   Users can upload a profile picture
-   If the user is inactive for 1 month, user will xp will be reset to 0 and complete tasks will be reset to empty

-   Best Practices
    -   All passwords are hashed
    -   All routes are protected
    -   All routes are tested
-   Best organization practices

    -   All routes are in a separate folder
    -   All models are in a separate folder
    -   All controllers are in a separate folder
    -   All middleware are in a separate folder

-   Error Handling

    -   All errors are handled
    -   All errors are sent to the client
    -   Common mongoose errors are handled

-   Strong Authentication functions
    -   Passwords are hashed
    -   JWT is used for authentication
    -   JWT is stored in a cookie
    -   JWT is signed
    -   JWT is short lived
    -   JWT is not stored in local storage

## Technologies Used

-   React
-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JWT
-   Bcrypt

## Installation and Setup Instructions

```bash
# Clone the repo
git clone https://github.com/Adosh74/xp-earner

# Move into the project directory
cd xp-earner

# Install dependencies
npm install

# create a .env file in the server folder and add the following
NODE_ENV=development
PORT=4000
DATABASE=<enter your database url>
JWT_SECRET=<enter your secret>

# Install dependencies for the client and server
npm run build

# Run the app
npm run start

# now the app is running on http://localhost:3000
# and the server is running on http://localhost:4000
```

## API Documentation

### Auth Routes

**POST /api/v1/signup**

-   Creates a new user
    -   That takes in a `name`, `email`, `password`, `passwordConfirm`, and `image`
-   Returns a JWT token
-   Returns a cookie with the JWT

**POST /api/v1/login**

-   Logs in a user
-   Returns a JWT token
-   Returns a cookie with the JWT

**GET /api/v1/logout**

-   Logs out a user
-   Sets the JWT cookie to loggedout

### User Routes

**GET /api/v1/users**

-   Gets all users
-   Returns an array of users objects

**POST /api/v1/users**

-   Creates a new user
    -   That takes in a `name`, `email`, `password`, and `passwordConfirm`
-   Returns a user object

**GET /api/v1/users/me**

-   Gets the current user
-   Returns a user object
-   Protected Route

**PATCH /api/v1/users/complete-task/:taskId**

-   Completes a task for the current user
-   Returns a user object
-   Protected Route

### Task Routes

**GET /api/v1/tasks**

-   Gets all tasks
-   Returns an array of task objects

**POST /api/v1/tasks**

-   Creates a new task
    -   That takes in a `name`, `description`, and `xp_points`
-   Returns a task object

**GET /api/v1/tasks/:slug**

-   Gets a task by slug
-   Returns a task object

## ERD

**User:**

| User              | Attributes |
| ----------------- | ---------- |
| name              | String     |
| email             | String     |
| password          | String     |
| passwordConfirm   | String     |
| avatar            | String     |
| completed_tasks   | [taskId]   |
| xp_points         | Number     |
| passwordChangedAt | Date       |
| lastActivityAt    | Date       |

**Task:**

| Task        | Attributes |
| ----------- | ---------- |
| name        | String     |
| description | String     |
| xp_points   | Number     |
| slug        | String     |
