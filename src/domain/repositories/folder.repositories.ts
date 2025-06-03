import { Folder } from "../entities/folder.entities";

export interface FolderRepositories {
  findAll(depth: number): Promise<any>;
  findById(id: number): Promise<Folder | null>;
  findAllParent(groupParent: number[]): Promise<any>;
  findByParentId(id: number): Promise<any>;
  findMaxParentLength(): Promise<any>;
  create(folder: Partial<Folder>): Promise<Folder>;
  delete(id: number): Promise<null>;
  update(id: number, folder: Partial<Folder>): Promise<null>;
}
