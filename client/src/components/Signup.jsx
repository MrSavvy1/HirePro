import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ role }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: role
	});

	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

		const handleSubmit = async (e) => {
			e.preventDefault();
			if (formData.password !== formData.confirmPassword) {
				setError('Passwords do not match');
				return;
			}

			try {
				console.log(`Role: ${role}`);
				console.log('FormData:', formData);
				await axios.post(`https://hirepro-s561.onrender.com/api/signup`, formData);
				navigate('/login');
			} catch (err) {
				console.error('Signup error:', err);
				setError('Email already exist');
			
		};

	};

	return (
		<div className="signup">
		<div className="signup-container">
			<h2>Signup as {role}</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
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
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
				/>
				<button type="submit">Signup</button>
			</form>
			{error && <p className="error">{error}</p>}
		</div>
		</div>
		
	);
};

export default Signup;
