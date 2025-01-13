import mysql from "mysql";
import dotenv from "dotenv";

// const pool = mysql.createPool({
//   user: "root",
//   password: "dkNZizUJVxjURlqKUErLlQfTsCfypHta",
//   database: "mydb",
//   host: "junction.proxy.rlwy.net",
//   port: 44208,
// });
//mysql -hjunction.proxy.rlwy.net -uroot -pdkNZizUJVxjURlqKUErLlQfTsCfypHta --port 44208 --protocol=TCP railway

dotenv.config();
const pool = mysql.createPool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.HOST,
  port: Number(process.env.PORT),
});

export { pool };
