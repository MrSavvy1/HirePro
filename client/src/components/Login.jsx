import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Login = ({ onLogin }) => {
		const [formData, setFormData] = useState({ email: '', password: '', role: 'regular' });
		const [error, setError] = useState('');
		const navigate = useNavigate();

		const handleChange = (e) => {
				setFormData({ ...formData, [e.target.name]: e.target.value });
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				try {
						const response = await axios.post('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/signin', formData);

					console.log('Login successful, Role from formdata: ', formData.role);
						const userRole = formData.role;
					console.log('Login successful, userRole:', userRole);

					// Assuming the response contains the user's role

						// Call onLogin to update the app's state
						onLogin(userRole);

						// Navigate based on the role
					console.log('Login successful, userRole after update:', userRole);

						if (userRole === 'regular') {
								navigate('/joblisting'); // Navigate to Jobs if role is regular
						} else if (userRole === 'company') {
								navigate('/post-job'); // Navigate to PostJob if role is company
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
										<option value="regular">Employee</option>
										<option value="company">Company</option>
								</select>
								<button type="submit">Login</button>
						</form>
				</div>
			</div>
		);
};

export default Login;
