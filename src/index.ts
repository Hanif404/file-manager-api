import { Elysia } from "elysia";
import config from './config/config';
import { folderRouter } from "./interfaces/routes/folder.route";
import { fileRouter } from "./interfaces/routes/file.route";

const app = new Elysia()
.use(folderRouter)
.use(fileRouter)
.get("/", () => "Hello Elysia")
.listen(config.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
