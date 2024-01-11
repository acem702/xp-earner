import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(
                'http://localhost:4000/api/v1/login',
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                    credentials: 'include',
                },
            )
            .then((res) => {
                console.log(res);
                // redirect to home page
                navigate('/');
                alert('User logged in successfully');
            })
            .catch((err) => {
                console.log(err);
                alert(err.response.data.message);
            });
    };

    return (
        <div
            className="container mt-5"
            style={{ backgroundColor: '#f0f0f0', padding: '20px' }}
        >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <p className="mt-3">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
