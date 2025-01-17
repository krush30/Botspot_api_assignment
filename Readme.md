# Task Management API

This API allows users to manage tasks, including creating, updating, deleting, and searching tasks. It also provides user authentication and authorization using JWT.

## Prerequisites
- Node.js
- MongoDB
- Postman (for testing API endpoints)

## Installation
1. Clone the repository:
  
   git clone "https://github.com/krush30/Botspot_api_assignment.git"
   
2. Install dependencies:
     npm install
 
3. Create a `.env` file in the root directory and add the following:

   MONGO_URI=mongodb+srv://iemp6226:LVEgz2BSOfdu7YEJ@mongodb.4bnmk.mongodb.net/?retryWrites=true&w=majority&appName=Mongodb
   PORT=5000

## Running the Server
Start the server by running:

npm start

The server will run on `http://localhost:5000` by default.

## API Endpoints

### User Routes

#### Register a User
**POST** `/api/user`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "Krushna",
    "email": "ingalekrusna2030@gmail.com",
    "password": "123123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "<jwt_token>"
  }
  ```

### Task Routes

#### Create a Task
**POST** `/api/task`
- **Description**: Creates a new task.
- **Headers**:
  - `x-auth-token`: JWT token
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task description"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<task_id>",
    "title": "New Task",
    "description": "Task description",
    "user": "<user_id>",
    "createdAt": "2025-01-17T00:00:00.000Z",
    "updatedAt": "2025-01-17T00:00:00.000Z"
  }
  ```

#### Get All Tasks
**GET** `/api/task`
- **Description**: Retrieves all tasks.
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  ```json
  [
    {
      "_id": "<task_id>",
      "title": "Task Title",
      "description": "Task description",
      "user": "<user_id>",
      "createdAt": "2025-01-17T00:00:00.000Z",
      "updatedAt": "2025-01-17T00:00:00.000Z"
    }
  ]
  ```

#### Get Task by ID
**GET** `/api/task/:id`
- **Description**: Retrieves a specific task by its ID.
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  ```json
  {
    "_id": "<task_id>",
    "title": "Task Title",
    "description": "Task description",
    "user": "<user_id>",
    "createdAt": "2025-01-17T00:00:00.000Z",
    "updatedAt": "2025-01-17T00:00:00.000Z"
  }
  ```

#### Update a Task
**PUT** `/api/task/:id`
- **Description**: Updates an existing task.
- **Headers**:
  - `x-auth-token`: JWT token
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "status": "Completed"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "<task_id>",
    "title": "Updated Title",
    "description": "Updated description",
    "user": "<user_id>",
    "createdAt": "2025-01-17T00:00:00.000Z",
    "updatedAt": "2025-01-17T00:00:00.000Z"
  }
  ```

#### Delete a Task
**DELETE** `/api/task/:id`
- **Description**: Deletes a specific task by its ID.
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  ```json
  {
    "msg": "Task has been deleted"
  }
  ```

#### Search Tasks by Title
**GET** `/api/task/search/:title`
- **Description**: Searches for tasks by title (case-insensitive).
- **Headers**:
  - `x-auth-token`: JWT token
- **Response**:
  ```json
  [
    {
      "_id": "<task_id>",
      "title": "Task Title",
      "description": "Task description",
      "user": "<user_id>",
      "createdAt": "2025-01-17T00:00:00.000Z",
      "updatedAt": "2025-01-17T00:00:00.000Z"
    }
  ]
  ```

## Models

### User Model
```javascript
{
  "name": "String",
  "email": "String",
  "password": "String"
}
```

### Task Model
```javascript
{
  "title": "String",
  "description": "String",
  "user": "ObjectId",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Middleware
- **Auth Middleware**: 
Verifies the JWT token for protected routes.
I have only added the auth middleware such that no other user can delete or update other users Tasks.


