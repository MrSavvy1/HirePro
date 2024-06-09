// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
		const [formData, setFormData] = useState({
				name: '',
				email: '',
				password: '',
				userType: 'employer' // default to employer for now
		});

		const { name, email, password, userType } = formData;
		const navigate = useNavigate();

		const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

		const onSubmit = async e => {
				e.preventDefault();
				const newUser = {
						name,
						email,
						password,
						userType
				};

				try {
						const config = {
								headers: {
										'Content-Type': 'application/json'
								}
						};

						const body = JSON.stringify(newUser);
						const res = await axios.post('/api/auth/register', body, config);

						if (res.data.token) {
								navigate('/login');
						}
				} catch (err) {
						console.error(err.response.data);
				}
		};

		return (
				<form onSubmit={onSubmit}>
						<div>
								<input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
						</div>
						<div>
								<input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
						</div>
						<div>
								<input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
						</div>
						<div>
								<select name="userType" value={userType} onChange={onChange}>
										<option value="employer">Employer</option>
										<option value="jobseeker">Job Seeker</option>
								</select>
						</div>
						<input type="submit" value="Register" />
				</form>
		);
}

export default SignUp;
