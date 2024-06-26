// AppliedJobs.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppliedJobs = () => {
		const [appliedJobs, setAppliedJobs] = useState([]);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState('');

		useEffect(() => {
				const fetchAppliedJobs = async () => {
						const token = localStorage.getItem('token');
						if (token) {
								try {
										const response = await axios.get('/api/employees/appliedjobs', {
												headers: { 'Authorization': `Bearer ${token}` }
										});
										setAppliedJobs(response.data);
								} catch (error) {
										setError('Error fetching applied jobs. Please try again later.');
										console.error('Error fetching applied jobs:', error);
								} finally {
										setIsLoading(false);
								}
						} else {
								setError('No token found. Please log in.');
								setIsLoading(false);
						}
				};
				fetchAppliedJobs();
		}, []);

		if (isLoading) {
				return <p>Loading applied jobs...</p>;
		}

		return (
				<div>
						<h2>Applied Jobs</h2>
						{error && <p style={{ color: 'red' }}>{error}</p>}
						{appliedJobs.length === 0 ? (
								<p>No jobs applied yet.</p>
						) : (
								<ul>
										{appliedJobs.map(job => (
												<li key={job.id}>
														<h3>{job.title}</h3>
														<p>{job.description}</p>
														{/* Add more job details as needed */}
												</li>
										))}
								</ul>
						)}
				</div>
		);
};

export default AppliedJobs;
