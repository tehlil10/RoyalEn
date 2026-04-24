import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="content-area">
                <Navbar />
                <div className="main-content">
                    <h2 className="text-white mb-4"> Dashboard</h2>
                    <p className="text-secondary">Welcome to Royal Enfield Dashboard</p>
                </div>
            </div>
        </div>
    );
}