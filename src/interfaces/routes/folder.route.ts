import { Elysia } from "elysia";
import Folder from "../controllers/folder.controllers";

export const folderRouter = new Elysia({ prefix: "/v1/folder" })
    .get('/', async(context) => Folder.showFolder(context))
    .post('/', async(context) => Folder.createFolder(context))
    .delete('/:id', async(context) => Folder.deleteFolder(context))