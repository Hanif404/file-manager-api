import { ERROR_CODE } from "../../config/constant";
import wrapper from "../../utils/wrapper";
import { FolderRepositoriesImpl } from "../../domain/repositories-impl/folder.repositoriesImpl";
import { CreateFolderUseCase } from "../../usecases/folder/createFolder.usecase";
import { DeleteFolderUseCase } from "../../usecases/folder/deleteFolder.usecase";
import { ShowFolderUseCase } from "../../usecases/folder/showFolder.usecase";

export default class Folder {
    static async showFolder(context: any): Promise<any> {
        const ctx = 'controller-folder-show'
        const { error } = context;
        const showFolderUseCase = new ShowFolderUseCase(new FolderRepositoriesImpl());
        const result = await showFolderUseCase.findAll();
        if (!result) {
            return wrapper.response(ctx, context, error(ERROR_CODE.NOT_FOUND, 'not found folder'))
        }
        return wrapper.response(ctx, context, {
            response: 'success show folder',
            data: result
        }
        );
    }

    static async showIdFolder(context: any): Promise<any> {
        const ctx = 'controller-folder-show'
        const { params, error } = context;
        const showFolderUseCase = new ShowFolderUseCase(new FolderRepositoriesImpl());
        const result = await showFolderUseCase.findById(Number(params.id));
        if (!result) {
            return wrapper.response(ctx, context, error(ERROR_CODE.NOT_FOUND, 'not found folder'))
        }
        return wrapper.response(ctx, context, {
            response: 'success show folder by id',
            data: result
        }
        );
    }

    static async createFolder(context: any) {
        const ctx = 'controller-folder-create'
        const { body, error } = context;
        const createFolderUseCase = new CreateFolderUseCase(new FolderRepositoriesImpl());
        const result = await createFolderUseCase.create(body);
        if (!result) {
            return wrapper.response(ctx, context, error(ERROR_CODE.INTERNAL_ERROR, 'failed create folder'))
        }

        return wrapper.response(ctx, context, {
            response: 'success create folder',
            data: {
                id: result.id,
                name: result.name,
                createdAt: result.createdAt
            }
        }
        );
    }

    static async deleteFolder(context: any) {
        const ctx = 'controller-folder-delete'
        const { params, error } = context;
        if (params && !params.id) {
            return wrapper.response(ctx, context, error(ERROR_CODE.BAD_REQUEST, 'id not existing'))
        }
        const deleteFolderUseCase = new DeleteFolderUseCase(new FolderRepositoriesImpl());
        const result = await deleteFolderUseCase.delete(Number(params.id));
        if (!result) {
            return wrapper.response(ctx, context, error(ERROR_CODE.INTERNAL_ERROR, 'failed delete folder'))
        }

        return wrapper.response(ctx, context, {
            response: 'success delete folder'
        }
        );
    }
}