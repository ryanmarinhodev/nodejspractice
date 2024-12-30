import mysql from "mysql";

const pool = mysql.createPool({
  user: "root",
  password: "ryan@123",
  database: "project-node",
  host: "localhost",
  port: 3306,
});

export { pool };
