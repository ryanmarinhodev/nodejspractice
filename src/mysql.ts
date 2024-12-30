import mysql from "mysql";

const pool = mysql.createPool({
  user: "root",
  password: "ryan@123",
  database: "project-node",
  host: "project-node",
});

module.exports = pool;
