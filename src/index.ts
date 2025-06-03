import { Elysia } from "elysia";
import config from './config/config';
import { folderRouter } from "./interfaces/routes/folder.route";

const app = new Elysia()
.use(folderRouter)
.get("/", () => "Hello Elysia")
.listen(config.port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
