// client/src/components/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
						const roleEndpoint = formData.role.toLowerCase(); // Convert role to lowercase for the endpoint
						let endpoint = '';
						if (roleEndpoint === 'employee') {
								endpoint = 'https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:5000/api/auth/login/employee'; 
						} else if (roleEndpoint === 'company') {
								endpoint = 'https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:5000/api/auth/login/company';
						} else {
								setError('Invalid role selected');
								return;
				z		}
						//console.log('This is: ${endpoint}' );
						await axios.post(endpoint, formData);
					if (formData.role === 'Employee') {
							navigate('/joblisting'); // Navigate to JobListing if role is Employee
					} else if (formData.role === 'Company') {
							navigate('/post-job'); // Navigate to PostJob if role is Company
					}
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