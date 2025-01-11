import { Router } from "express";
import { VideosRepository } from "../modules/user/videos/VideosRepository.js";

interface Typegem {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  expiresIn: string;
}

const videosRoutes = Router();
const videosRepository = new VideosRepository();
const getVideos = new VideosRepository();

videosRoutes.post("/criar-videos", (req, res) => {
  videosRepository.create(req, res);
});
videosRoutes.get("/get-videos", (req, res) => {
  getVideos.getVideos(req, res);
});

export { videosRoutes };
