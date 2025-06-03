import { FileRepositories } from "../../domain/repositories/file.repositories";
import { FolderRepositories } from "../../domain/repositories/folder.repositories";
import config from "../../config/config";

export class CreateFileUseCase {
    private folder = config.rootFolder;
    constructor(private fileRepo: FileRepositories, private folderRepo : FolderRepositories) { }

    async create(data: { name: string, content?: string, folderId?: number }) {
        if (data.folderId) {
            const parentFolder = await this.folderRepo.findById(data.folderId);
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
        }
        this.folder = this.folder + "/" + data.name;
        await Bun.write(this.folder, String(data.content));
        return await this.fileRepo.create(data);
    }
}