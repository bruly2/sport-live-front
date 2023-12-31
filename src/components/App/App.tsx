import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Inscription from "../../pages/Inscription/Inscription";
import Connexion from "../../pages/Connexion/Connexion";
import Hub from "../../pages/Hub/Hub";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Legals from "../../pages/Legals/Legals";

const App: React.FC = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Hub />} />
                <Route path="/hub" element={<Hub />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/mentions-legales" element={<Legals />} />
                <Route path="/*" element={<ErrorPage />} />
                {/* 🔽🔐 Pages authentifiées  */}
                <Route path="/hub" element={<Hub />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
