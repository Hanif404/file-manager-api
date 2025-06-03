import { Elysia } from "elysia";
import Folder from "../controllers/folder.controllers";
import wrapper from "../../utils/wrapper";
import { ERROR_CODE } from "../../config/constant";

export const folderRouter = new Elysia({ prefix: "/v1/folder" })
    .onError((context) => {
        const ctx = 'router-folder-error';
        return wrapper.response(ctx, context, {
            response: context.error.toString(),
            code: ERROR_CODE.INTERNAL_ERROR
        })
    })
    .get('/', async(context) => Folder.showFolder(context))
    .get('/:id', async(context) => Folder.showIdFolder(context))
    .post('/', async(context) => Folder.createFolder(context))
    .delete('/:id', async(context) => Folder.deleteFolder(context))