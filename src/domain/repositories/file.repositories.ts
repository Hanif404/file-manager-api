import { File } from "../entities/file.entities";

export interface FileRepositories {
  findAll(): Promise<any>;
  findById(id: number): Promise<File | null>;
  create(file: Partial<File>): Promise<File>;
  delete(id: number): Promise<null>;
}
