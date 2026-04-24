import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from "react-toastify";
// import { loginUser } from '../api/AuthApi.js';

const BASE = 'http://localhost:5000/api';
export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("form", form)
            const response = await axios.post(`${BASE}/login`, form);

            const name = response.data.email.split("@")[0];

            login(response.data.token, {
                name: name.charAt(0).toUpperCase() + name.slice(1),
                email: response.data.email
            });
            toast.success("Login successful!");
            console.log("Response:", response.data);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box shadow-lg">
                <h2 className="text-center mb-4">Royal Enfield</h2>
                <p className="text-center text-secondary mb-4">Log in </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control border-secondary"
                            placeholder="Email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control border-secondary"
                            placeholder="Password"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            autoComplete="new-password"
                            required
                            style={{ paddingRight: '40px' }}
                        />
                        <span onClick={() => setShowPassword(!showPassword)} style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                                color: '#7a7777',
                                fontSize: '20px',
                                zIndex: 10
                            }}
                        >{!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                         </span>

                    </div>
                    <button type="submit" className="btn w-100 mt-2"
                        style={{ background: '#f5a623', color: 'black', fontWeight: 'bold', padding: '10px' }}>
                        Login
                    </button>
                </form>
                {error && <p className="text-danger text-center mt-3">{error}</p>}
            </div>
        </div>
    );
}