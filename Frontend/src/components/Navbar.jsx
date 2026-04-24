import { useState } from "react";
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api/AuthApi.js';

export default function Navbar() {
    const {token, logout, user} = useAuth();

    const [open, setOpen] = useState(false);
    const initials = user?.name
        ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
        : "U";

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser(token);
        logout();
        navigate('/login');

    };

    return (
        <nav className="navbar navbar-dark px-4 py-3"
             style={{background: '#2a2a2a', borderBottom: '2px solid #f5a623'}}>
            <span className="nav-brand"> Royal Enfield</span>

            <div className="d-flex justify-content-end align-items-center gap-3">

                <div className="d-flex justify-content-end align-items-center gap-3">

                    <div className="position-relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
                         style={{ paddingBottom: "10px" }}>

                        {/* AVATAR */}
                        <div
                            onClick={() => setOpen(!open)}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "#1c1c1c",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontWeight: "bold",
                                cursor: "pointer"
                            }}>
                            {initials}
                        </div>

                        {/* DROPDOWN */}
                        {open && (
                            <div
                                className="position-absolute bg-white text-dark rounded shadow"
                                style={{
                                    right: 0,
                                    top: "50px",
                                    width: "260px",
                                    zIndex: 1000
                                }}
                            >

                                {/* USER INFO */}
                                <div className="p-3 border-bottom d-flex align-items-center gap-3">
                                    <div
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            borderRadius: "50%",
                                            background: "#111",
                                            color: "white",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {initials}
                                    </div>

                                    <div>
                                        <div style={{ fontWeight: "600", color: "#6f42c1" }}>
                                            {user?.name}
                                        </div>
                                        <small className="text-muted">{user?.email}</small>
                                    </div>
                                </div>

                                <hr className="m-0" />

                                {/* LOGOUT */}
                                <div className="p-2">
                                    <button className="btn btn-warning w-100" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>

                </div>
            </div>
        </nav>
    );
}