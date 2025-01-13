import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../mysql.js";
import bcrypt, { compare } from "bcrypt";
import Jwt from "jsonwebtoken";
import { Request, Response } from "express";

class UserRepository {
  create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const id = uuidv4();

    try {
      const passwordHash = bcrypt.hashSync(password, 10);

      const sql =
        "INSERT INTO users (user_id, name, email, password) VALUES(?,?,?,?)";
      pool.query(sql, [id, name, email, passwordHash], (err, result) => {
        if (err) {
          return res.status(400).json("Erro ao conectar ao banco de dados");
        }
        res.status(200).json({ message: "Usuário cadastrado com sucesso" });
      });
    } catch (err) {
      res.status(400).json("Erro ao criptgrafar senha");
    }
  }

  login(req: Request, res: Response) {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    pool.query(sql, [email], (err, results) => {
      console.log(results[0]);
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao acessar o banco de dados" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Usuário encontrado, comparar senhas
      const user = results[0];
      compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao comparar senha" });
        }

        if (result) {
          const token = Jwt.sign(
            {
              id: results[0].user_id,
              email: results[0].email,
            },
            process.env.SECRET as string,
            { expiresIn: "1d" }
          );
          console.log(token);
          return res.status(200).json({ token });
        }
      });
    });
  }
}

export { UserRepository };
