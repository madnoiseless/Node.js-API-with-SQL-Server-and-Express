const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser"); // Added for parsing request body

const app = express();
const port = 3000;

// Configure SQL Server connection details
const config = {
  user: "your_username",
  password: "your_password",
  server: "your_server_name",
  database: "your_database_name",
  port: 1433,
};

// Connect to SQL Server
mssql
  .connect(config)
  .then((pool) => {
    console.log("Connected to SQL Server");

    // Middleware to parse request body for POST requests
    app.use(bodyParser.json()); // Parse JSON data

    // Define routes
    app.get("/data", async (req, res) => {
      // Define your SQL query here (replace with your specific query)
      const query = "SELECT * FROM your_table_name";

      try {
        const result = await pool.request().query(query);
        res.json(result.recordset); // Send data as JSON
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error retrieving data"); // Handle errors
      }
    });

    app.post("/data", async (req, res) => {
      const newData = req.body; // Access data from request body

      // Define your SQL INSERT query here
      const query = `INSERT INTO your_table_name (column1, column2, ...) VALUES (@col1, @col2, ...)`;

      try {
        const request = pool.request();
        // Add parameters for each column in the INSERT query
        request.input("col1", newData.column1); // Replace with actual column names
        request.input("col2", newData.column2); // ...

        await request.query(query);
        res.status(201).send("Data inserted successfully"); // Created status code
      } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).send("Error creating data");
      }
    });

    app.delete("/data/:id", async (req, res) => {
      const id = req.params.id; // Access ID from URL parameter

      // Define your SQL DELETE query here
      const query = `DELETE FROM your_table_name WHERE id = @id`;

      try {
        const request = pool.request();
        request.input("id", id);

        await request.query(query);
        res.status(204).send(); // No Content status code (data deleted)
      } catch (err) {
        console.error("Error deleting data:", err);
        res.status(500).send("Error deleting data");
      }
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to SQL Server:", err);
  });
