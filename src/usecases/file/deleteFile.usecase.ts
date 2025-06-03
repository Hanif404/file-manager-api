import { FolderRepositories } from "../../domain/repositories/folder.repositories";
import { FileRepositories } from "../../domain/repositories/file.repositories";
import config from "../../config/config";

export class DeleteFileUseCase {
    private folder = config.rootFolder;
    constructor(private fileRepo: FileRepositories, private folderRepo: FolderRepositories) { }

    async delete(id: number) {
        const findFile = await this.fileRepo.findById(id);
        if (!findFile) {
            return null;
        }
        const parentFolder = await this.folderRepo.findById(findFile.folderId);
        const groupParent = parentFolder?.groupParent != null ? parentFolder?.groupParent : parentFolder?.id;

        let myParent: number[];
        try {
            myParent = String(groupParent).split(",").map(Number);
        } catch (error) {
            myParent = [Number(groupParent)];
        }
        const getParentData = await this.folderRepo.findAllParent(myParent);
        for (let index = 0; index < getParentData.length; index++) {
            this.folder = this.folder + "/" + getParentData[index].name;
        }
        this.folder = this.folder + "/" + findFile.name;
        const file = Bun.file(this.folder);
        const result = Promise.all([
            await file.delete(),
            await this.fileRepo.delete(id)
        ]);
        return result;
    }
}