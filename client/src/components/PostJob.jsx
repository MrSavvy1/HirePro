import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';
import './PostJob.css';

const PostJob = () => {
		const [formData, setFormData] = useState({
				title: '', description: '', location: '', experience: '', type: '', salary: ''
		});
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const [userRole, setUserRole] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);
		const [formErrors, setFormErrors] = useState({});

		useEffect(() => {
				const token = localStorage.getItem('token');
				if (token) {
						try {
								const decodedToken = jwtDecode.default(token);
								if (decodedToken.exp * 1000 > Date.now()) {
										setIsAuthenticated(true);
										setUserRole(decodedToken.role);
								} else {
										localStorage.removeItem('token');
								}
						} catch (err) {
								setError('Invalid token');
						}
				}
				setLoading(false);
		}, []);

		const validate = () => {
				const errors = {};
				if (!formData.title) errors.title = "Job Title is required";
				if (!formData.description) errors.description = "Job Description is required";
				if (!formData.location) errors.location = "Location is required";
				if (!formData.experience) errors.experience = "Experience Level is required";
				if (!formData.type) errors.type = "Job Type is required";
				if (!formData.salary || !/^\d+(-\d+)?$/.test(formData.salary)) errors.salary = "Salary Range is required and must be in correct format (e.g., 50000-70000)";
				return errors;
		};

		const handleChange = (e) => {
				setFormData({ ...formData, [e.target.name]: e.target.value });
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				const errors = validate();
				if (Object.keys(errors).length > 0) {
						setFormErrors(errors);
						return;
				}

				if (isAuthenticated && userRole === 'company') {
						try {
								await axios.post('https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:5000/api/jobs', formData, {
										headers: {
												'Authorization': `Bearer ${localStorage.getItem('token')}`
										}
								});
								alert('Job posted successfully!');
								setFormData({ title: '', description: '', location: '', experience: '', type: '', salary: '' });
								setFormErrors({});
						} catch (error) {
								alert('Failed to post job. Please try again.');
								setError(error.message);
						}
				} else {
						alert('You must be logged in as a company to post a job');
				}
		};

		if (loading) {
				return <p>Loading...</p>;
		}

		if (error) {
				return <p>{error}</p>;
		}

		return (
				<div className="post-job-container">
						{isAuthenticated && userRole === 'company' ? (
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
												{formErrors.title && <p className="error">{formErrors.title}</p>}
												<textarea
														name="description"
														placeholder="Job Description"
														value={formData.description}
														onChange={handleChange}
														required
												/>
												{formErrors.description && <p className="error">{formErrors.description}</p>}
												<input
														type="text"
														name="location"
														placeholder="Location"
														value={formData.location}
														onChange={handleChange}
														required
												/>
												{formErrors.location && <p className="error">{formErrors.location}</p>}
												<input
														type="text"
														name="experience"
														placeholder="Experience Level"
														value={formData.experience}
														onChange={handleChange}
														required
												/>
												{formErrors.experience && <p className="error">{formErrors.experience}</p>}
												<input
														type="text"
														name="type"
														placeholder="Job Type"
														value={formData.type}
														onChange={handleChange}
														required
												/>
												{formErrors.type && <p className="error">{formErrors.type}</p>}
												<input
														type="text"
														name="salary"
														placeholder="Salary Range"
														value={formData.salary}
														onChange={handleChange}
														required
												/>
												{formErrors.salary && <p className="error">{formErrors.salary}</p>}
												<button type="submit">Post Job</button>
										</form>
								</>
						) : (
								<p>Please login as a company to post a job</p>
						)}
				</div>
		);
};

export default PostJob;
