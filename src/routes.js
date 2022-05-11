import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";

import DashboardPage from "./pages/Dashboard";
import DepartamentPage from "./pages/Departament";

import ErrorPage from "./pages/Error";

const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />

                <Route exact path="/dashboard" element={<DashboardPage />} />
                <Route exact path="/departament" element={<DepartamentPage />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;