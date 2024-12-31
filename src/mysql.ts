import mysql from "mysql";

// const pool = mysql.createPool({
//   user: "root",
//   password: "dkNZizUJVxjURlqKUErLlQfTsCfypHta",
//   database: "mydb",
//   host: "junction.proxy.rlwy.net",
//   port: 44208,
// });
//mysql -hjunction.proxy.rlwy.net -uroot -pdkNZizUJVxjURlqKUErLlQfTsCfypHta --port 44208 --protocol=TCP railway

const pool = mysql.createPool({
  user: "root",
  password: "ryan@123",
  database: "project-node",
  host: "localhost",
  port: 3306,
});

export { pool };
