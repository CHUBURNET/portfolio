import React, {useEffect, useState} from 'react';
import style from "../../styles/modules/Header.module.css"
import {Link, useLocation} from "react-router-dom";
import {useWindowWidth} from "../../hooks/useWindowWidth.tsx";

const Header:React.FC = () => {
    const {pathname} = useLocation()
    const screenWidth = useWindowWidth();
    const routes = [
        {
            name: "_hello",
            path: "/",
        },
        {
            name: "_about-me",
            path: "/about",
        },
        {
            name: "_projects",
            path: "/projects",
        },

    ]

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    function toggleBurger() {
        setIsBurgerOpen(!isBurgerOpen)
    }

    useEffect(() => {
        if(screenWidth > 813){
            setIsBurgerOpen(false)
        }
    }, [screenWidth]);

    return (
        <header>
            <div style={{height: (screenWidth <= 813 && isBurgerOpen) ? "90vh" : "auto"}} className={style.container}>
                <div className={style.me}>
                    <span>artem-chubur</span>
                    <div className={style.burger}>
                        <button onClick={toggleBurger}>
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H18V2H0V0ZM0 7H18V9H0V7ZM0 14H18V16H0V14Z" fill="#62748E"/>
                            </svg>
                        </button>
                        {/*<div>*/}
                        {/*    <div># navigate:</div>*/}
                        {/*    <Link to={"/"}>_contact-me</Link>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div style={{display: isBurgerOpen ? "block" : "none"}} className={style.burgerMess}># навигация:</div>
                {(screenWidth >= 813 || isBurgerOpen) && routes.map((route): React.ReactNode =>
                    <Link
                        onClick={() => setIsBurgerOpen(false)}
                        key={route.name}
                        to={route.path}
                        style={{borderBottom: `${route.path === pathname ? "2px solid #fdb769" : "1px solid var(--border-c)"}`}}
                    >{route.name}</Link>
                )}
                <div className={style.empty}></div>
                {(screenWidth >= 813 || isBurgerOpen) && <Link onClick={() => setIsBurgerOpen(false)} to={"/"}>_contact-me</Link>}
            </div>
        </header>
    );
};

export default Header;