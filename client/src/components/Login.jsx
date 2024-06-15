import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setPage }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:5000/api/auth/login', formData);
			if (response.data.success) {
				setPage('welcome');
			} else {
				alert('Invalid credentials!');
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<div className="container form-container">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
				<input type="password" name="password" placeholder="Your password" value={formData.password} onChange={handleChange} required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
