import { ERROR_CODE } from "../../config/constant";
import wrapper from "../../utils/wrapper";
import { FileRepositoriesImpl } from "../../domain/repositories-impl/file.repositoriesImpl";
import { FolderRepositoriesImpl } from "../../domain/repositories-impl/folder.repositoriesImpl";
import { CreateFileUseCase } from "../../usecases/file/createFile.usecase";
import { DeleteFileUseCase } from "../../usecases/file/deleteFile.usecase";

export default class File {
    static async createFile(context: any) {
        const ctx = 'controller-file-create'
        const { body, error } = context;
        const createFolderUseCase = new CreateFileUseCase(new FileRepositoriesImpl(), new FolderRepositoriesImpl());
        const result = await createFolderUseCase.create(body);
        if (!result) {
            return wrapper.response(ctx, context, error(ERROR_CODE.INTERNAL_ERROR, 'failed create file'))
        }

        return wrapper.response(ctx, context, {
            response: 'success create file',
            data: {
                id: result.id,
                name: result.name,
                createdAt: result.createdAt
            }
        }
        );
    }

    static async deleteFile(context: any) {
        const ctx = 'controller-file-delete'
        const { params, error } = context;
        if (params && !params.id) {
            return wrapper.response(ctx, context, error(ERROR_CODE.BAD_REQUEST, 'id not existing'))
        }
        const deleteFileUseCase = new DeleteFileUseCase(new FileRepositoriesImpl(), new FolderRepositoriesImpl());
        const result = await deleteFileUseCase.delete(Number(params.id));
        if (!result) {
            return wrapper.response(ctx, context, error(ERROR_CODE.INTERNAL_ERROR, 'failed delete file'))
        }

        return wrapper.response(ctx, context, {
            response: 'success delete file'
        }
        );
    }
}