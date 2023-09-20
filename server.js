require("dotenv").config();

// const { verifyJWT } = require("./JwtUtils");
// const express = require("express");

// Assuming you have your routes and other middleware in "./app"
const app = require("./app");

const fs = require("fs");
console.log(__dirname);
console.log(fs.readdirSync(__dirname));

// Add JWT verification middleware to routes that require authentication
// e.g., app.use("/protectedRoute", verifyJWT);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
