import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EolTpms from './pages/EolTpms.jsx';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();
    return token ? children : <Navigate to="/login" />;
};

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/dashboard" element={
                        <PrivateRoute> <Dashboard /> </PrivateRoute>
                    } />

                    <Route path="/EolTpms" element={
                        <PrivateRoute> <EolTpms /> </PrivateRoute>
                    } />

                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}