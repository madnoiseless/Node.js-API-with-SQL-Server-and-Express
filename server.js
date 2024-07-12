const express = require("express");
const mssql = require("mssql");
const bodyParser = require("body-parser"); // Added for parsing request body

require("dotenv").config();

const app = express();
const port = Number(process.env.PORT1);

// Configure SQL Server connection details
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.PORT2),
  options: {
    encrypt: process.env.ENCRYPT === "true",
  },
};

const tableName01 = process.env.TABLE_NAME01;

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
      const query = `SELECT * FROM ${tableName01}`;

      try {
        const result = await pool.request().query(query);
        res.json(result.recordset); // Send data as JSON
      } catch (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error retrieving data"); // Handle errors
      }
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to SQL Server:", err);
  });
