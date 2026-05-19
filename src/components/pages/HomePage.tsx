import React from 'react';
import style from "../../styles/pages/HomePage.module.css"
import SnakeGame from "../modules/SnakeGame.tsx";

const HomePage: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.leftContainer}>
                <div className={style.hello}>
                    <span>Привет, я</span>
                    <h2>Артем Чубур</h2>
                    <span className={style.job}>{">"} Front-end разработчик</span>
                </div>
                <div className={style.github}>
                    <span className={style.startGameForContinue}>// Сыграйте в игру для продолжения</span>
                    <span>// Мой профиль Github:</span>
                    <div className={style.githubInCode}>
                        <span className={"const"}>const</span>
                        <span className={"variable"}>githubLink</span>
                        <span style={{color: "#fff"}}>=</span>
                        <a className={"string"} target={"_blank"} href={"https://github.com/CHUBURNET"}>"https://github.com/CHUBURNET"</a>
                    </div>
                </div>
            </div>
            <div className={style.rightContainer}>
                <SnakeGame />
            </div>
        </div>
    );
};

export default HomePage;