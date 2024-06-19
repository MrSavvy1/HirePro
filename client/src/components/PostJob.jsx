/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostJob.css';
import jwtDecode from 'jwt-decode'; // Import for token decoding
const PostJob = () => {
		const [formData, setFormData] = useState({ title: '', description: '' });
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const [userRole, setUserRole] = useState(null);
		useEffect(() => {
				// Check for token and user role
				const token = localStorage.getItem('token');
				if (token) {
						setIsAuthenticated(true);
						const decodedToken = jwtDecode(token);
						setUserRole(decodedToken.role);
				}
		}, []);
		const handleChange = (e) => {
				setFormData({ ...formData, [e.target.name]: e.target.value });
		};
		const handleSubmit = async (e) => {
				e.preventDefault();
				// Only allow posting if the user is authenticated as a company
				if (isAuthenticated && userRole === 'company') {
						await axios.post('/api/jobs', formData);
						alert('Job posted successfully!');
				} else {
						alert('You must be logged in as a company to post a job');
				}
		};
		return (
				<div className="post-job-container">
						{isAuthenticated && userRole === 'company' && (
								<>
										<h2>Post a Job</h2>
										<form onSubmit={handleSubmit}>
												<input
														type="text"
														name="title"
														placeholder="Job Title"
														value={formData.title}
														onChange={handleChange}
														required
												/>
												<textarea
														name="description"
														placeholder="Job Description"
														value={formData.description}
														onChange={handleChange}
														required
												/>
												<button type="submit">Post Job</button>
										</form>
								</>
						)}
						{!isAuthenticated && <p>Please login as a company to post a job</p>}
				</div>
		);
};
export default PostJob;*/