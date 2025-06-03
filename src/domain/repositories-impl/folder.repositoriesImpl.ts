import { FolderRepositories } from "../repositories/folder.repositories";
import { Folder } from "../entities/folder.entities";
import { Prisma, prisma } from "../../config/prisma";

export class FolderRepositoriesImpl implements FolderRepositories {
    private generateNestedInclude(depth: number): Prisma.FolderInclude {
        if (depth <= 0) return { children: true };

        return {
            children: {
                include: this.generateNestedInclude(depth - 1)
            }
        };
    }

    async findAll(depth: number = 3): Promise<any> {
        return await prisma.folder.findMany({
            where: {
                parentFolderId: null
            },
            include: this.generateNestedInclude(depth)
        });
    }

    async findAllParent(groupParent: number[]): Promise<any> {
        return await prisma.folder.findMany({
            where: {
                id: {
                    in: groupParent.map(Number)
                }
            }
        })
    }

    async findById(id: number): Promise<Folder | null> {
        return await prisma.folder.findUnique({ where: { id }, include: { children: true, File: true }});
    }

    async findByParentId(id: number): Promise<any> {
        return await prisma.folder.findMany({ where: { parentFolderId: id } });
    }

    async findMaxParentLength(): Promise<any> {
        return await prisma.folder.aggregate({ _max: { groupParent: true }, });
    }

    async create(folder: Folder): Promise<Folder> {
        return await prisma.folder.create({ data: folder });
    }

    async delete(id: number): Promise<any> {
        return await prisma.folder.delete({
            where: {
                id,
            },
        })
    }

    async update(id: number, folder: Folder): Promise<any> {
        return await prisma.folder.update({
            where: {
                id,
            },
            data: folder,
        })
    }
}
