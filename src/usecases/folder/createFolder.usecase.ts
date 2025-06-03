import { FolderRepositories } from "../../domain/repositories/folder.repositories";
import { mkdir } from 'node:fs/promises';
import config from "../../config/config";

export class CreateFolderUseCase {
    private folder = config.rootFolder;
    constructor(private folderRepo: FolderRepositories) { }

    async create(data: { name: string, parentFolderId?: number }) {
        const result = await this.folderRepo.create(data);
        if (result) {
            //TODO: buat path folder dari parent ke grand childrennya
            if (data.parentFolderId) {
                const parentFolder = await this.folderRepo.findById(data.parentFolderId);
                const groupParent = parentFolder?.groupParent != null ? parentFolder?.groupParent : parentFolder?.id;
                const pathParent = groupParent + ',' + result.id;
                await this.folderRepo.update(result.id, { groupParent: pathParent });

                let myParent : number[];
                try {
                    myParent = String(groupParent).split(",").map(Number);
                } catch (error) {
                    myParent = [Number(groupParent)];
                }
                const getParentData = await this.folderRepo.findAllParent(myParent);
                for (let index = 0; index < getParentData.length; index++) {
                    this.folder = this.folder + "/" + getParentData[index].name;
                }
            }
            this.folder = this.folder + "/" + data.name;
            await mkdir(this.folder, { recursive: false });
        }
        return result
    }
}
