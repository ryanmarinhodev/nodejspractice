import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../mysql.js";
import { Request, Response } from "express";

class VideosRepository {
  create(req: Request, res: Response) {
    const id = uuidv4();
    const { user_id, title, description } = req.body;

    try {
      const sql =
        "INSERT INTO videos (video_id, user_id, title, description) VALUES(?,?,?,?)";
      pool.query(sql, [id, user_id, title, description], (err) => {
        if (err) {
          return res.status(400).json("Erro ao conectar ao banco de dados");
        }
        res.status(200).json({ message: "Vídeo criado com sucesso" });
      });
    } catch (err) {
      res.status(400).json("Insira um título e descrição para o vídeo");
    }
  }
}

export { VideosRepository };
