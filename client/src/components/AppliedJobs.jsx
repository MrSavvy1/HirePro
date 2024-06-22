import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';

const AppliedJobs = () => {
		const { user } = useContext(AuthContext);
		const [appliedJobs, setAppliedJobs] = useState([]);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState('');

		useEffect(() => {
				const fetchAppliedJobs = async () => {
						try {
								const response = await axios.get(`/api/employees/${user.id}/appliedjobs`, {
										headers: {
												'Authorization': `Bearer ${localStorage.getItem('token')}`
										}
								});
								setAppliedJobs(response.data);
						} catch (error) {
								setError('Error fetching applied jobs. Please try again later.');
								console.error('Error fetching applied jobs:', error);
						} finally {
								setIsLoading(false);
						}
				};
				fetchAppliedJobs();
		}, [user.id]);

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
