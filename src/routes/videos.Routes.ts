import { Router } from "express";
import { VideosRepository } from "../modules/user/videos/VideosRepository.js";
import { middlewareLogin } from "../middleware/middlewareLogin.js";

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
const searchVideos = new VideosRepository();

videosRoutes.post("/criar-videos", middlewareLogin, (req, res) => {
  videosRepository.create(req, res);
});
videosRoutes.get("/get-videos", (req, res) => {
  getVideos.getVideos(req, res);
});

videosRoutes.get("/searchVideos", (req, res) => {
  searchVideos.search(req, res);
});

export { videosRoutes };
