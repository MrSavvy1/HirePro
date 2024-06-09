import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setPage, role }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		try {
			await axios.post('http://localhost:5000/api/auth/signup', { ...formData, role });
			setPage('login');
		} catch (error) {
			console.error('Signup error:', error);
		}
	};

	return (
		<div className="container form-container">
			<h2>Signup as {role}</h2>
			<form onSubmit={handleSubmit}>
				<input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} required />
				<input type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
				<input type="password" name="password" placeholder="Your password" value={formData.password} onChange={handleChange} required />
				<input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default Signup;
