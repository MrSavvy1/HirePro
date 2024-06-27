import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppliedJobs = () => {
		const [appliedJobs, setAppliedJobs] = useState([]);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState('');

		useEffect(() => {
				const fetchAppliedJobs = async () => {
						try {
								const response = await axios.get('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/employees/appliedjobs');
								setAppliedJobs(response.data);
						} catch (error) {
								setError('Error fetching applied jobs. Please try again later.');
								console.error('Error fetching applied jobs:', error);
						} finally {
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
