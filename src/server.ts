import express from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "./mysql.js";

const app = express();

app.use(express.json());

app.post("/create", (request, response) => {
  const { name, email, password } = request.body;
  pool.getConnection((err: any, connection: any) => {
    connection.query(
      "INSERT INTO users (`user-id`, name, email, password) VALUES(?, ?, ?, ?)",
      [uuidv4(), name, email, password],
      (error: any, results: any, fileds: any) => {
        if (error) {
          return response.status(400).json({ error });
        }
        return response.status(200).json({ message: "sucesso" });
      }
    );
  });
});

app.listen(4000);
