import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setPage, role }) => {
	const [formData, setFormData] = useState({ name: '', email: '', password: '', role });

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/api/signup', formData);
			if (res.data.success) {
				setPage('login');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form className="form-container" onSubmit={handleSubmit}>
			<h2>Create your account</h2>
			<input type="text" name="name" placeholder="Full name" onChange={handleInputChange} required />
			<input type="email" name="email" placeholder="Your email address" onChange={handleInputChange} required />
			<input type="password" name="password" placeholder="Your Password" onChange={handleInputChange} required />
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default Signup;
