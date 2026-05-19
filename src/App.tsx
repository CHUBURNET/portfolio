import React from 'react';
import {Routes, Route} from 'react-router-dom';
import HomePage from "./components/pages/HomePage.tsx";
import Header from "./components/modules/Header.tsx";
import Footer from "./components/modules/Footer.tsx";

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="*" element={<HomePage/>}/>
            </Routes>
            <Footer />
        </>
    );
};

export default App;