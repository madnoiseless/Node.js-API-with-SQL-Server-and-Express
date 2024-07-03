## Node.js API with SQL Server and Express

This project is a basic Node.js application built with Express that interacts with a Microsoft SQL Server database. It demonstrates CRUD operations (Create, Read, Update, Delete) on a database table.

**Features:**

- Connect to a Microsoft SQL Server database.
- Retrieve data from the database using a GET request.
- Insert new data into the database using a POST request.
- Delete data from the database using a DELETE request with an ID parameter.
- Parse JSON data from request bodies using body-parser.

**Requirements:**

- Node.js and npm installed ([https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager))
- Microsoft SQL Server database

**Setup:**

1. Clone this repository.
2. Install dependencies: `npm install`
3. Update the `config.js` file with your SQL Server connection details (username, password, server, database, port).
4. Run the server: `node server.js`

**API Endpoints:**

| Method | URL | Description |
|---|---|---|
| GET | `/data` | Retrieves data from the specified table. |
| POST | `/data` | Inserts new data into the specified table (data provided in JSON body). |
| DELETE | `/data/:id` | Deletes data from the specified table based on the provided ID. |

**Important Notes:**

- This is a basic example for demonstration purposes. Consider implementing additional features like:
    - Input validation to prevent SQL injection attacks.
    - More specific error handling with informative messages.
    - Security best practices (e.g., storing sensitive information in environment variables).
    - Logging for debugging and monitoring.
- Replace placeholders like `your_table_name`, `column1`, and `column2` with your actual database table and column names.

**Getting Started:**

After setting up the project, you can use tools like Postman to test the API endpoints.

**Example (GET request):**

```
GET http://localhost:3000/data
```

This retrieves all data from the specified table and returns it as JSON.

**Example (POST request):**

```
POST http://localhost:3000/data
Content-Type: application/json

{
  "column1": "value1",
  "column2": "value2",
  // ... other data
}
```

This inserts a new row into the table with the provided data in the JSON body.

**Example (DELETE request):**

```
DELETE http://localhost:3000/data/123
```

This deletes the row with ID 123 from the table.

This README provides a basic guide to get you started. Feel free to modify and extend this project to fit your specific needs.
