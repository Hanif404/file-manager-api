import { FolderRepositories } from "../../domain/repositories/folder.repositories";

export class ShowFolderUseCase {
    constructor(private folderRepo: FolderRepositories) { }

    async findAll() {
        const parentLength = await this.folderRepo.findMaxParentLength();
        const depth = String(parentLength._max.groupParent).split(',').length;
        return await this.folderRepo.findAll(depth);
    }

    async findById(id: number) {
        return await this.folderRepo.findById(id);
    }
}