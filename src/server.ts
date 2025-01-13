import express from "express";
import { userRoutes } from "./routes/user.Routes.js";
import { videosRoutes } from "./routes/videos.Routes.js";

const app = express();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/videos", videosRoutes);
app.use("/videosget", videosRoutes);
app.use("/search", videosRoutes);

app.listen(4000);
