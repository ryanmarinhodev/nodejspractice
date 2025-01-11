import { v4 as uuidv4 } from "uuid";
import { pool } from "../../../mysql.js";
import { Request, Response } from "express";

class VideosRepository {
  create(req: Request, res: Response) {
    const id = uuidv4();
    const { user_id, title, description } = req.body;

    // Verificando se os parâmetros necessários estão presentes
    if (!title) {
      return res.status(400).json({ message: "Título são obrigatórios" });
    }

    // Primeira consulta: Inserir o novo vídeo
    const insertSql =
      "INSERT INTO videos (video_id, user_id, title, description) VALUES(?,?,?,?)";
    pool.query(insertSql, [id, user_id, title, description], (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erro ao conectar ao banco de dados", error: err });
      }

      return res.status(201).json({ message: "Vídeo criado com sucesso" });
    });
  }

  // Segunda consulta: Obter os vídeos do usuário após inserir o novo vídeo
  getVideos(req: Request, res: Response) {
    const { user_id } = req.body;

    const sqlGet = "SELECT * FROM videos WHERE user_id = ?";
    pool.query(sqlGet, [user_id], (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao buscar vídeos" });
      }

      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum vídeo encontrado para esse usuário" });
      }

      return res.status(200).json({ videos: results });
    });
  }
}

export { VideosRepository };
