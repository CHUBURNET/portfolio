import React, {type ChangeEvent, useEffect, useState} from 'react';
import style from "../../styles/pages/ProjectsPage.module.css";
import {projects, tags} from "../../utils/constants/projects.tsx";
import type {IProject, ITag} from "../../types/IProject.ts";

const ProjectsPage: React.FC = (): React.ReactElement => {
    const [activeFilters, setActiveFilters] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const [projectsList, setProjectsList] = useState<IProject[]>(projects)

    useEffect((): void => {
        const filteredProjects: IProject[] = projects.filter((project: IProject): boolean => {
            return project.tags.some((tagId: string | number): boolean => activeFilters.includes(tagId as number));
        });

        setProjectsList(filteredProjects);
    }, [activeFilters]);

    return (
        <div className={style.container}>
            <div className={style.tagsContainer}>
                {tags.map((tag: ITag): React.ReactNode =>
                    <div key={tag.id}>
                        <label className={style.tag}>
                            <input
                                onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                    const isChecked: boolean = e.target.checked;
                                    if (isChecked) {
                                        setActiveFilters([...activeFilters, tag.id]);
                                    } else {
                                        setActiveFilters((prev: number[]): number[] => prev.filter((i: number): boolean => i !== tag.id));
                                    }
                                }}
                                checked={!!activeFilters.find((i: number): boolean => i === tag.id)}
                                type="checkbox"
                            />
                            <div className={style.tagName}>
                                {tag.logo}
                                <span>{tag.display}</span>
                            </div>
                        </label>
                    </div>
                )}
            </div>
            <div style={{overflowY: "auto"}} className={style.projectsContainer}>
                {projectsList.map((project: IProject): React.ReactNode =>
                    <div className={style.project}>
                        <img src={project.preview} alt=""/>
                        <div className={style.info}>
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                            <div className={style.btns}>
                                <a target={"_blank"} href={project.github}>
                                    <button>
                                        <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C4.475 0 0 4.475 0 10C0 14.425 2.8625 18.1625 6.8375 19.4875C7.3375 19.575 7.525 19.275 7.525 19.0125C7.525 18.775 7.5125 17.9875 7.5125 17.15C5 17.6125 4.35 16.5375 4.15 15.975C4.0375 15.6875 3.55 14.8 3.125 14.5625C2.775 14.375 2.275 13.9125 3.1125 13.9C3.9 13.8875 4.4625 14.625 4.65 14.925C5.55 16.4375 6.9875 16.0125 7.5625 15.75C7.65 15.1 7.9125 14.6625 8.20002 14.4125C5.975 14.1625 3.65 13.3 3.65 9.475C3.65 8.3875 4.0375 7.4875 4.675 6.7875C4.575 6.5375 4.225 5.5125 4.775 4.1375C4.775 4.1375 5.6125 3.875 7.525 5.1625C8.32502 4.9375 9.17502 4.825 10.025 4.825C10.875 4.825 11.725 4.9375 12.525 5.1625C14.4375 3.8625 15.275 4.1375 15.275 4.1375C15.825 5.5125 15.475 6.5375 15.375 6.7875C16.0125 7.4875 16.4 8.375 16.4 9.475C16.4 13.3125 14.0625 14.1625 11.8375 14.4125C12.2 14.725 12.5125 15.325 12.5125 16.2625C12.5125 17.6 12.5 18.675 12.5 19.0125C12.5 19.275 12.6875 19.5875 13.1875 19.4875C17.258 18.1133 19.9989 14.2963 20 10C20 4.475 15.525 0 10 0Z" fill="#62748E"></path></svg>
                                    </button>
                                </a>
                                <a target={"_blank"} href={project.deploy}>
                                    <button className={style.deployBtn}>Деплой</button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsPage;