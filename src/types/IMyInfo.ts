import type {ReactNode} from "react";

export interface IMyInfo {
    name: string;
    folderIcon: ReactNode;
    files: IFile[]
}

export interface IFile {
    fileName: string;
    text: string;
}

export interface IFileState extends IFile {
    id: string;
    isActive: boolean;
}