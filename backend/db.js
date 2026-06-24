const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "admin_freshmart",     // User baru
  password: "password123",      // Password baru
  database: "proyekuas"
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

module.exports = db;