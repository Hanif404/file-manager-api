import { FileRepositories } from "../repositories/file.repositories";
import { File } from "../entities/file.entities";
import { Prisma, prisma } from "../../config/prisma";

export class FileRepositoriesImpl implements FileRepositories {
    async findAll(): Promise<any> {
        return await prisma.file.findMany()
    }

    async findById(id: number): Promise<File | null> {
        return await prisma.file.findUnique({ where: { id } });
    }

    async create(file: File): Promise<File> {
        const payload: Prisma.FileUncheckedCreateInput = {
            name: file.name,
            folderId: file.folderId
        };
        return await prisma.file.create({ data: payload });
    }

    async delete(id: number): Promise<any> {
        return await prisma.file.delete({
            where: {
                id,
            },
        })
    }
}
