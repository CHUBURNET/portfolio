import React from "react";

export interface IProject{
    name: string;
    preview: string;
    github: string;
    deploy: string;
    tags: (string | number)[];
    description: string;
}

export interface ITag{
    id: number;
    display: string;
    logo: React.ReactNode;
}