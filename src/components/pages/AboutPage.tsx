import React, {useEffect, useState} from 'react';
import style from "../../styles/pages/AboutPage.module.css"
import TreeMenu from "../UI/TreeMenu.tsx";
import type {ITriangleIcon} from "../../types/ITriangleIcon.ts";
import {myInfo} from "../../utils/constants/aboutMe.tsx";
import type {IFile, IFileState, IMyInfo} from "../../types/IMyInfo.ts";

const TriangleIcon: React.FC<ITriangleIcon> = ({style, className, fill}: ITriangleIcon): React.ReactNode => <svg style={style} className={className} width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L0 8V0L4 4Z" fill={fill}/>
</svg>

const AboutPage: React.FC = (): React.ReactNode => {
    const [openedFiles, setOpenedFiles] = useState<IFileState[]>([
        {
            id: "0",
            isActive: true,
            fileName: "Общая информация",
            text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi asperiores assumenda, blanditiis consectetur consequatur cum cupiditate delectus dicta doloremque eos eveniet impedit inventore maiores modi nulla ratione rerum sequi, tempora totam ullam unde velit veniam veritatis vitae. Id iusto magnam nesciunt quaerat rem. Aliquid harum inventore perferendis provident quaerat.",
        }
    ])

    function openFile(file: IFile): void {
        setOpenedFiles((prev: IFileState[]): IFileState[] => {
            const filtered: IFileState[] = prev.filter((item: IFileState): boolean => item.fileName !== file.fileName)
            if (filtered.length > 2) {
                filtered.pop()
            }
            filtered.forEach((item: IFileState): void => {
                item.isActive = false
            })
            return [
                {
                    ...file,
                    id: crypto.randomUUID(),
                    isActive: true
                },
                ...filtered
            ]
        })
    }

    function closeFile(file: IFile): void {
        setOpenedFiles((prev: IFileState[]): IFileState[] => {
            const filtered: IFileState[] = prev.filter((item: IFileState): boolean => item.fileName !== file.fileName);
            if (filtered.length === 0) {
                return [];
            }

            const wasActive: boolean | undefined = prev.find((item: IFileState): boolean => item.fileName === file.fileName)?.isActive;
            return filtered.map((item: IFileState, index: number): IFileState => {
                return {
                    ...item,
                    isActive: wasActive ? index === 0 : item.isActive
                };
            });
        });
    }

    useEffect((): void => {
        console.log(openedFiles)
    }, [openedFiles]);

    return (
        <div className={style.container}>
            <div className={style.AboutNavigation}>
                <div className={style.TreeContainer}>
                    <TreeMenu
                        Name={<span>Информация</span>}
                        isDefaultOpen={true}
                        Triangle={TriangleIcon}
                    >
                        <div style={{display: "flex", flexDirection: "column",  gap: "10px", marginTop: "10px"}}>
                            {myInfo.map((item: IMyInfo): React.ReactNode =>
                                <TreeMenu
                                    key={item.name}
                                    isDefaultOpen={true}
                                    // Triangle={TriangleIcon}
                                    Name={<div>{item.folderIcon} <span>{item.name}</span></div>}
                                >
                                    {item.files.map((file: IFile): React.ReactNode =>
                                        <div onClick={(): void => openFile(file)} title={file.fileName} className={style.fileRow} key={file.fileName}>
                                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.666667 0H12.6667C13.0349 0 13.3333 0.29848 13.3333 0.666667V11.3333C13.3333 11.7015 13.0349 12 12.6667 12H0.666667C0.29848 12 0 11.7015 0 11.3333V0.666667C0 0.29848 0.29848 0 0.666667 0ZM3.33333 8.33333V5.66667L4.66667 7L6 5.66667V8.33333H7.33333V3.66667H6L4.66667 5L3.33333 3.66667H2V8.33333H3.33333ZM10.6667 6.33333V3.66667H9.33333V6.33333H8L10 8.33333L12 6.33333H10.6667Z" fill="#62748E"/>
                                            </svg>
                                            <span className={style.fileName}>{file.fileName}</span>
                                        </div>
                                    )}
                                </TreeMenu>
                            )}
                        </div>
                    </TreeMenu>
                </div>
                <div className={style.TreeContainer}>
                    <TreeMenu
                        Name={<span>Контакты</span>}
                        isDefaultOpen={true}
                    >
                        <div className={style.contacts}>
                            <div className={style.contact}>
                                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.666667 0H12.6667C12.8435 0 13.013 0.0702379 13.1381 0.195262C13.2631 0.320286 13.3333 0.489856 13.3333 0.666667V11.3333C13.3333 11.5101 13.2631 11.6797 13.1381 11.8047C13.013 11.9298 12.8435 12 12.6667 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V0.666667C0 0.489856 0.0702379 0.320286 0.195262 0.195262C0.320286 0.0702379 0.489856 0 0.666667 0V0ZM6.70667 5.78867L2.432 2.15867L1.56867 3.17467L6.71533 7.54467L11.7693 3.17133L10.8973 2.16267L6.70733 5.78867H6.70667Z" fill="#62748E"/>
                                </svg>
                                <a href="mailto:artemchubur.freelance@gmail.com?subject=Пишу с сайта https://chubur.top">artemchubur.freelance@gmail.com</a>
                            </div>
                            <div className={style.contact}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 8.94667V11.304C12.0001 11.4728 11.9361 11.6353 11.8211 11.7588C11.706 11.8823 11.5484 11.9575 11.38 11.9693C11.0887 11.9893 10.8507 12 10.6667 12C4.77533 12 0 7.22467 0 1.33333C0 1.14933 0.01 0.911334 0.0306667 0.62C0.0424816 0.451629 0.117721 0.294007 0.241202 0.178939C0.364684 0.0638712 0.527215 -7.62887e-05 0.696 1.71053e-07H3.05333C3.13603 -8.35563e-05 3.2158 0.0305727 3.27715 0.0860136C3.33851 0.141455 3.37706 0.217722 3.38533 0.3C3.40067 0.453334 3.41467 0.575333 3.428 0.668C3.56049 1.59262 3.832 2.49189 4.23333 3.33533C4.29667 3.46867 4.25533 3.628 4.13533 3.71333L2.69667 4.74133C3.5763 6.79097 5.2097 8.42436 7.25933 9.304L8.286 7.868C8.32796 7.80933 8.38919 7.76725 8.459 7.7491C8.52881 7.73095 8.60277 7.73787 8.668 7.76867C9.51135 8.16924 10.4104 8.44008 11.3347 8.572C11.4273 8.58533 11.5493 8.6 11.7013 8.61467C11.7835 8.62309 11.8596 8.66171 11.9149 8.72305C11.9702 8.78439 12.0008 8.86408 12.0007 8.94667H12Z" fill="#62748E"/>
                                </svg>
                                <a href="tel:996553252008">+996 553 252 008</a>
                            </div>
                        </div>
                    </TreeMenu>
                </div>
            </div>
            <div className={style.content}>
                <div className={style.contentHeader}>
                    {openedFiles.map((file: IFileState): React.ReactNode =>
                        <div key={file.id} style={{width: `calc(100% / ${openedFiles.length})`}} className={style.tab}>
                            <span>{file.fileName}</span>
                            <button style={{ cursor: 'pointer', position: 'relative', zIndex: 3 }} onClick={() => closeFile(file)}>
                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.24267 3.3L7.54267 0L8.48533 0.942667L5.18533 4.24267L8.48533 7.54267L7.54267 8.48533L4.24267 5.18533L0.942667 8.48533L0 7.54267L3.3 4.24267L0 0.942667L0.942667 0L4.24267 3.3Z" fill="#90A1B9"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    {openedFiles.map((file: IFileState): React.ReactNode =>
                        <React.Fragment key={file.id}>
                            {file.isActive &&
                                <p id={"info"} className={style.contentText}>
                                    <span>/**</span>
                                    <span>{file.text}</span>
                                    <span>**/</span>
                                </p>
                            }
                        </React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;