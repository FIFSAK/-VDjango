// src/components/RegisterForm.jsx
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'; // Import useNavigate
import {registerUser} from '../api';
import './RegisterForm.css';


const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        role: 'job_seeker',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await registerUser(formData);
            setMessage(`${response.message} Registered as ${response.role}.`);
        } catch (err) {
            setError(err.error || 'Registration failed. Please try again.');
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{width: '100%', padding: '8px', margin: '5px 0'}}
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{width: '100%', padding: '8px', margin: '5px 0'}}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                        style={{width: '100%', padding: '8px', margin: '5px 0'}}
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        style={{width: '100%', padding: '8px', margin: '5px 0'}}
                    >
                        <option value="job_seeker">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>
                <button type="submit" style={{padding: '10px 20px', marginTop: '10px'}}>
                    Register
                </button>
            </form>
            <button className="secondary"
                    onClick={handleLoginRedirect}
                    style={{padding: '10px 20px', marginTop: '10px', backgroundColor: '#f0f0f0'}}
            >
                Login
            </button>
            {message && <p className="message success">{message}</p>}
            {error && <p className="message error">{error}</p>}

        </div>
    );
};

export default RegisterForm;