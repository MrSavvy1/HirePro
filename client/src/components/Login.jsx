// client/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './Login.css';

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '', role: 'Employee' });
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/api/auth/login', formData);
			
			navigate('/welcome');
		} catch (error) {
			setError('Invalid email or password');
		}
	};

	return (
		<div className="login-container">
			<form onSubmit={handleSubmit} className="form-container">
				<h2>Login</h2>
				{error && <p className="error">{error}</p>}
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<select name="role" value={formData.role} onChange={handleChange}>
					<option value="Employee">Employee</option>
					<option value="Company">Company</option>
				</select>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
