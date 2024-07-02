import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import './Signup.css';

const Login = ({ onLogin }) => {
		const [formData, setFormData] = useState({ email: '', password: '', role: 'Regular' });
		const [error, setError] = useState('');
		const navigate = useNavigate();

		const handleChange = (e) => {
				setFormData({ ...formData, [e.target.name]: e.target.value });
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				try {
						const response = await axios.post('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:5000/api/signin', formData);

					console.log('Login successful, Role from formdata: ', formData.role);
						const userRole = formData.role;
					console.log('Login successful, userRole:', userRole);

					
						onLogin(userRole);

						
					console.log('Login successful, userRole after update:', userRole);

						if (userRole === 'Regular') {
								navigate('/joblisting'); 
						} else if (userRole === 'Company') {
								navigate('/post-job'); 
						}
				} catch (error) {
						setError('Invalid email or password');
				}
		};

		return (
			
			<div className="signup">
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
										<option value="Regular">Employee</option>
										<option value="Company">Company</option>
								</select>
								<button type="submit">Login</button>
						</form>
				</div>
			</div>
		);
};

export default Login;
