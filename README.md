# Project Setup

This is an Express.js application that provides several API endpoints for user authentication and managing sets of data. Below are the instructions on how to set up and use the application locally.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (or any other database if configured differently)

## Setup Instructions

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/C242-PR608/leflash-server.git
cd leflash-server
```
### 2. Run the following command to install all necessary dependencies:
```bash
npm install
```
### 3. Environtment Variables  
Create a .env file in the root directory of the project. Add the environtment variables:
```bash
# Environment Variables
DB_URL=mongodb://localhost:27017/your-database-name
JWT_SECRET=your_jwt_secret_key
```
### 4. Start the Server
Once the dependencies are installed and the .env file is configured, start the server:
```bash
npm run start
```

## API Documentation  
### 1. POST /api/auth/login
Description: Log in a user with email and password.  

Request Body:
```bash
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

Response:  

Success: Returns a JWT token on successful login.  
Error: Returns an error message if login fails.

### 2. POST /api/auth/register
Description: Register a new user with email and password.  

Request Body:
```bash
{
  "username": "Jhon Doe",
  "email": "newuser@example.com",
  "password": "newuserpassword"
}
```

Response:

Success: Returns a success message.  
Error: Returns an error message if registration fails.

### 3. GET /api/user
Description: Get the data of the authenticated user (requires a valid JWT token).

Request Header:
- Authorization: Bearer <JWT_TOKEN>

Response:
Success: Returns the user data.  
Error: Returns an error message if the user is not authenticated.

### 4. GET /api/sets
Description: Get all sets from the database.

Response:
Success: Returns an array of all sets.  
Error: Returns an error message.

### 5. GET /api/sets/user
Description: Get all sets that belong to the authenticated user.

Request Header:
- Authorization: Bearer <JWT_TOKEN>

Response:
Success: Returns an array of sets owned by the user.  
Error: Returns an error message if the user is not authenticated.

### 6. GET /api/sets/:id
Description: Get a set by its ID.

Request Parameter:
- id: The ID of the set.

Response:
Success: Returns the set with the specified ID.  
Error: Returns an error message if the set is not found.

### 7. POST /api/sets
Description: Add a new set to the database.

Request Body:
```bash
{
  "topic": "Set Name",
  "description": "Set description",
  "author_id": "user_id",
  "cards": [{
    "term": "card_term",
    "definition: "card_definition"}]
}
```
Response:

Success: Returns the newly created set.  
Error: Returns an error message if the set cannot be created.

### 8. PUT /api/sets/:id
Description: Update the set with the given ID.

Request Parameter:

- id: The ID of the set.

Request Body:

```bash
{
  "topic": "Set Name",
  "description": "Set description",
  "author_id": "user_id",
  "cards": [{
    "term": "card_term",
    "definition: "card_definition"}]
}
```
Response:

Success: Returns the updated set.  
Error: Returns an error message if the update fails.

### 9. DELETE /api/sets/:id
Description: Delete the set with the given ID.

Request Parameter:
- id: The ID of the set to be deleted.

Response:
Success: Returns a success message.  
Error: Returns an error message if the set could not be deleted.

### Error Handling
The API will return appropriate HTTP status codes to indicate the result of the operation:
```bash
200 OK - Successful operation
201 Created - Resource created successfully
400 Bad Request - Invalid request or parameters
401 Unauthorized - Authentication failed or missing token
404 Not Found - Resource not found
500 Internal Server Error - Server error
```
