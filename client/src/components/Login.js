// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
		const [formData, setFormData] = useState({
				email: '',
				password: ''
		});

		const { email, password } = formData;
		const navigate = useNavigate();

		const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

		const onSubmit = async e => {
				e.preventDefault();
				const user = {
						email,
						password
				};

				try {
						const config = {
								headers: {
										'Content-Type': 'application/json'
								}
						};

						const body = JSON.stringify(user);
						const res = await axios.post('/api/auth/login', body, config);

						if (res.data.token) {
								navigate('/');
						}
				} catch (err) {
						console.error(err.response.data);
				}
		};

		return (
				<form onSubmit={onSubmit}>
						<div>
								<input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
						</div>
						<div>
								<input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
						</div>
						<input type="submit" value="Login" />
				</form>
		);
}

export default Login;
