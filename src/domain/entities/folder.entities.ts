export interface Folder {
  id: number;
  name: string;
  parentFolderId?: number | null;
  createdAt: Date;
  groupParent?: string | null;
}