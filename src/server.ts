import express from "express";
import { v4 as uuidv4 } from "uuid";
import { pool } from "./mysql.js";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());
app.post("/rota", (req, res) => {
  const { name, email, password } = req.body;
  const id = uuidv4();

  try {
    const passwordHash = bcrypt.hashSync(password, 10);

    const sql =
      "INSERT INTO users (`user-id`, name, email, password) VALUES(?,?,?,?)";
    pool.query(sql, [id, name, email, passwordHash], (err, result) => {
      if (err) {
        return res.status(400).json("Erro ao conectar ao banco de dados");
      }
      res.status(200).json({ message: "Usuário cadastrado com sucesso" });
    });
  } catch (err) {
    res.status(400).json("Erro ao criptgrafar senha");
  }
});
app.listen(4000);
