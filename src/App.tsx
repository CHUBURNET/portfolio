import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./components/pages/HomePage.tsx";
import Header from "./components/modules/Header.tsx";
import Footer from "./components/modules/Footer.tsx";
import AboutPage from "./components/pages/AboutPage.tsx";
import ProjectsPage from "./components/pages/ProjectsPage.tsx";

const App: React.FC = () => {
    return (
        <div className={"appWrapper"}>
            <Header />
            <main className="mainContent">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/projects" element={<ProjectsPage/>}/>
                    <Route path="*" element={<HomePage/>}/>
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;