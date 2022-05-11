import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";

import DashboardPage from "./pages/Dashboard";
import DepartmentPage from "./pages/Department";

import ErrorPage from "./pages/Error";
import CategoryPage from "./pages/Category";
import PatrimonyPage from "./pages/Patrimony";

const RoutesApp = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />

                <Route exact path="/dashboard" element={<DashboardPage />} />
                <Route exact path="/department" element={<DepartmentPage />} />
                <Route exact path="/category" element={<CategoryPage />} />
                <Route exact path="/patrimony" element={<PatrimonyPage />} />

                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default RoutesApp;