import React, {type ElementType, type ReactNode, useState} from 'react';
import style from "../../styles/UI/TreeMenu.module.css"

interface IProps {
    Triangle?: ElementType;
    Name: ReactNode | string;
    children: ReactNode;
    isDefaultOpen?: boolean;
}

const TreeMenu: React.FC<IProps> = ({children, Name, Triangle, isDefaultOpen=false}) => {
    const [isOpen, setIsOpen] = useState<boolean>(isDefaultOpen)

    return (
        <div>
            <div className={style.header} onClick={() => setIsOpen(!isOpen)}>
                {Triangle  ?
                    <Triangle fill={isOpen ? "#fff" : "var(--text-c)"} style={{rotate: `${isOpen ? 90 : 0}deg`}} className={style.triangle}/> :
                    <div>
                        <svg style={{rotate: `${isOpen ? 90 : 0}deg`}} className={style.triangle} width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.29985 4.24265L0 0.942807L0.942813 0L5.18545 4.24265L0.942813 8.48525L0 7.54245L3.29985 4.24265Z" fill={isOpen ? "#fff" : "var(--text-c)"}/>
                        </svg>
                    </div>
                }
                <span className={style.name} style={{color: isOpen ? "#fff" : "var(--text-c)"}}>{Name}</span>
            </div>
            {isOpen &&
                <div className={style.body}>
                    {children}
                </div>
            }
        </div>
    );
};

export default TreeMenu;