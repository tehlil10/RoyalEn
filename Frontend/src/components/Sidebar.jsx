import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="sidebar">
            {/* Logo */}
            <div className="sidebar-brand">
                <h5>Royal Enfield</h5>
            </div>

            <hr style={{ borderColor: '#444' }} />

            {/* Menu Items */}
            <ul className="sidebar-menu">
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                         Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/EolTpms" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}>
                         EOL TPMS
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}