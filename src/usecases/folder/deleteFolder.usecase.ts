import { FolderRepositories } from "../../domain/repositories/folder.repositories";
import { rm } from "node:fs/promises";
import config from "../../config/config";

export class DeleteFolderUseCase {
    private folder = config.rootFolder;
    constructor(private folderRepo: FolderRepositories) { }

    async delete(id: number) {
        const folder = await this.folderRepo.findById(id);
        if (!folder) {
            return null;
        }
        const folderChild = await this.folderRepo.findByParentId(Number(folder.parentFolderId));
        if (folderChild.length > 0) {
            return null;
        }
        const result = await this.folderRepo.delete(id);
        if (result) {
            //TODO: buat path folder dari parent ke grand childrennya
            if (folder.groupParent) {
                let myParent: number[];
                try {
                    myParent = String(folder.groupParent).split(",").map(Number);
                } catch (error) {
                    myParent = [Number(folder.groupParent)];
                }
                const getParentData = await this.folderRepo.findAllParent(myParent);
                for (let index = 0; index < getParentData.length; index++) {
                    this.folder = this.folder + "/" + getParentData[index].name;
                }
            }
            this.folder = this.folder + "/" + folder.name;
            await rm(this.folder, { recursive: true, force: true });
        }
        return folder
    }
}