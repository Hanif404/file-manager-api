import { FileRepositories } from "../repositories/file.repositories";
import { File } from "../entities/file.entities";
import { prisma } from "../../config/prisma";

export class FileRepositoriesImpl implements FileRepositories {
    async findAll(): Promise<any> {
        // {
        //     where: {
        //         parentFolderId: null
        //     },
        //     include: {
        //         children: {
        //             include: {
        //                 children: true  // grandchildren
        //             }
        //         },
        //     }
        // }
        return await prisma.file.findMany()
    }

    async findById(id: number): Promise<File | null> {
        return await prisma.file.findUnique({ where: { id } });
    }

    async create(file: File): Promise<File> {
        return await prisma.file.create({ data: file });
    }

    async delete(id: number): Promise<any> {
        return await prisma.file.delete({
            where: {
                id,
            },
        })
    }
}
