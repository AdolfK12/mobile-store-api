# Online Store RESTful API

This project implements a RESTful API for managing products in an online store. It allows users to perform CRUD (Create, Read, Update, Delete) operations on products and includes authentication to ensure only authorized users can access certain endpoints.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Example Scenarios](#example-scenarios)
- [Testing](#testing)
- [Note](#note)

## Technologies Used

- Programming Language: Node.js
- Web Framework: Express
- ORM: Sequelize
- Database: PostgreSQL (Local)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AdolfK12/mobile-store-api.git
   ```

2. Install dependencies:

   ```bash
   cd <project_directory>
   npm install   # or yarn install
   ```

3. Set up the local PostgreSQL database, you just need adjust in config/config.json.
4. Set up environment variables (if any).

## API Endpoints

### Users

- **POST /api/users**: Register a new user.

  - Requires: None
  - Body Parameters:
    - `username` (string): The username of the user.
    - `email` (string): The email of the user.
    - `password` (string): The password of the user.
  - Response:
    - Status: 201 Created
    - Body: Returns a success message and the newly registered user.

- **POST /api/users/login**: Login with email and password to receive an authentication token.

  - Requires: None
  - Body Parameters:
    - `email` (string): The email of the user.
    - `password` (string): The password of the user.
  - Response:
    - Status: 200 OK
    - Body: Returns a JWT token for authentication.

- **GET /api/users/profile**: Get the profile of the authenticated user.

  - Requires: Authentication
  - Response:
    - Status: 200 OK
    - Body: Returns the profile information of the authenticated user.

- **PUT /api/users/profile**: Update the profile of the authenticated user.

  - Requires: Authentication
  - Body Parameters:
    - `username` (string, optional): The updated username of the user.
    - `password` (string, optional): The updated password of the user.
  - Response:
    - Status: 200 OK
    - Body: Returns a success message.

- **DELETE /api/users/profile**: Delete the profile of the authenticated user.
  - Requires: Authentication
  - Response:
    - Status: 200 OK
    - Body: Returns a success message.

### Products

- **GET /api/products**: Get a list of all products.

  - Requires: None
  - Response:
    - Status: 200 OK
    - Body: Returns a list of all products.

- **GET /api/products/:id**: Get details of a specific product by ID.

  - Requires: None
  - Path Parameters:
    - `id` (string): The ID of the product.
  - Response:
    - Status: 200 OK
    - Body: Returns the details of the product with the specified ID.

- **POST /api/products**: Create a new product.

  - Requires: Authentication, Admin Only
  - Body Parameters:
    - `name` (string): The name of the product.
    - `description` (string): The description of the product.
    - `price` (number): The price of the product.
    - `stock` (number): The stock quantity of the product.
  - Response:
    - Status: 201 Created
    - Body: Returns a success message and the newly created product.

- **PUT /api/products/:id**: Update details of a specific product by ID.

  - Requires: Authentication, Admin Only
  - Path Parameters:
    - `id` (string): The ID of the product.
  - Body Parameters:
    - Any product fields to be updated.
  - Response:
    - Status: 200 OK
    - Body: Returns a success message.

- **DELETE /api/products/:id**: Delete a product by ID.
  - Requires: Authentication, Admin Only
  - Path Parameters:
    - `id` (string): The ID of the product.
  - Response:
    - Status: 200 OK
    - Body: Returns a success message.

## Authentication

Authentication is required for endpoints that involve creating, updating, or deleting products. JSON Web Tokens (JWT) are used for authentication. Include the JWT token in the Authorization header for authenticated requests.

To authenticate a request:

1. Register a user using the `/api/users` endpoint or login using the `/api/users/login` endpoint to receive a JWT token.
2. Include the received JWT token in the Authorization header of subsequent requests.

## Example Scenarios

### User Login

- **Request:**

  ```
  POST /api/users/login
  Content-Type: application/json

  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

  Response:

  ```
  Status: 200 OK

  {
  "message": "User logged in successfully",
  "token": "<JWT_TOKEN>"
  }
  ```

### Creating a New Product (Admin Only)

- **Request:**

  ```
  POST /api/products
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  {
  "name": "iPhone 13",
  "description": "Latest model from Apple",
  "price": 999.99,
  "stock": 100
  }
  ```

  Response:

  ```
  Status: 201 Created

  {
  "message": "Product created successfully",
  "product": {
  "id": 1,
  "name": "iPhone 13",
  "description": "Latest model from Apple",
  "price": 999.99,
  "stock": 100,
  "createdAt": "2024-05-01T12:00:00Z",
  "updatedAt": "2024-05-01T12:00:00Z"
  }
  }
  ```

### Updating a Product (Admin Only)

- **Request:**
  PUT /api/products/1
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

  ```
  {
  "price": 1099.99
  }
  ```

  Response:

  ```
  Status: 200 OK

  {
  "message": "Product updated successfully",
  "product": {
  "id": 1,
  "name": "iPhone 13",
  "description": "Latest model from Apple",
  "price": 1099.99,
  "stock": 100,
  "createdAt": "2024-05-01T12:00:00Z",
  "updatedAt": "2024-05-01T13:00:00Z"
  }
  }
  ```

### Deleting a Product (Admin Only)

- **Request:**

  ```
  DELETE /api/products/1
  Authorization: Bearer <JWT_TOKEN>
  ```

  Response:

  ```
  Status: 200 OK

  {
  "message": "Product deleted successfully"
  }
  ```

These examples illustrate how to interact with the specified endpoints for user login and CRUD operations on products, ensuring authentication and authorization for admin-only actions. Adjust the request and response objects as needed to match your API implementation.

## Testing

Testing for the API is currently in development and is not yet fully implemented. I am actively working on setting up testing frameworks and writing test cases to ensure the reliability and correctness of the API endpoints. Stay tuned for updates as I progress with testing efforts.

## Note

This project is originally a task, and I haven't had the chance to create test cases yet. Over the next few days, I'll be updating the project to demonstrate various optimizations in the backend as optimally as possible. Stay tuned for further improvements and updates. Loom Video : `https://www.loom.com/share/fe5ddc553c7144df9ffa735f2bb1e5ea?sid=ae76b945-0934-438e-bff5-b15f633d7456`
