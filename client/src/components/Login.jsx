import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setPage }) => {
	const [loginData, setLoginData] = useState({ email: '', password: '' });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setLoginData({ ...loginData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/login', loginData);
			if (res.data.success) {
				setPage('welcome');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<h2>Login</h2>
			<input type="email" name="email" placeholder="Your email address" onChange={handleInputChange} required />
			<input type="password" name="password" placeholder="Your Password" onChange={handleInputChange} required />
			<button type="submit">Login</button>
		</form>
	);
};

export default Login;
