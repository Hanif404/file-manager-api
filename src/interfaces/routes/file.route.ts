import { Elysia } from "elysia";
import File from "../controllers/file.controllers";
import wrapper from "../../utils/wrapper";
import { ERROR_CODE } from "../../config/constant";

export const fileRouter = new Elysia({ prefix: "/v1/file" })
    .onError((context) => {
        const ctx = 'router-file-error';
        return wrapper.response(ctx, context, {
            response: context.error.toString(),
            code: ERROR_CODE.INTERNAL_ERROR
        })
    })
    .post('/', async (context) => File.createFile(context))
    .delete('/:id', async (context) => File.deleteFile(context))