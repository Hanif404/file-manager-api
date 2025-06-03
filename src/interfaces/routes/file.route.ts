import { Elysia } from "elysia";
import File from "../controllers/file.controllers";

export const fileRouter = new Elysia({ prefix: "/v1/file" })
    .get('/:id', async(context) => File.showFile(context))
    .post('/', async(context) => File.createFile(context))
    .delete('/:id', async(context) => File.deleteFile(context))