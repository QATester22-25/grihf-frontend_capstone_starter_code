const express = require("express");
const connectToMongo = require("./config/db");
const cors = require("cors");

connectToMongo();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));

// Start server
app.listen(8181, () => {
  console.log("✅ Server running on http://localhost:8181");
});
