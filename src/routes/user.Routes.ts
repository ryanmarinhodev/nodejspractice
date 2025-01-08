import { Router } from "express";
import { UserRepository } from "../modules/user/repositories/UserRepository.js";

interface Typegem {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  expiresIn: string;
}

const userRoutes = Router();
const userRepository = new UserRepository();

userRoutes.post("/sign-up", (req, res) => {
  userRepository.create(req, res);
});

userRoutes.post("/sign-in", (req, res) => {
  userRepository.login(req, res);
});

export { userRoutes };
