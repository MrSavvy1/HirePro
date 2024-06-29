import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JobListing.css';

const JobListing = () => {
		const [jobs, setJobs] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState('');

		useEffect(() => {
				const fetchJobs = async () => {
						try {
								const response = await axios.get('https://hirepro-s561.onrender.com/api/alljobs');
								if (response.data.success && Array.isArray(response.data.data)) {
										setJobs(response.data.data);
								} else {
										setError('Unexpected data format from API');
								}
						} catch (error) {
								setError('Error fetching jobs');
						} finally {
								setLoading(false);
						}
				};

				fetchJobs();
		}, []);

		if (loading) {
				return <p>Loading...</p>;
		}

		if (error) {
				return <p>{error}</p>;
		}

git 
		const availableJobs = jobs.filter(job => job.available);

		return (
				<div className="job-listing-container">
						<h2>Available Jobs</h2>
						{availableJobs.length === 0 ? (
								<p>No jobs available at the moment.</p>
						) : (
								<div className="job-list">
										{availableJobs.map((job) => (
												<div key={job._id} className="job-item">
														<div className="job-details">
																<h3>{job.title}</h3>
																<p><strong>Salary:</strong> {job.salary}</p>
																<p><strong>Location:</strong> {job.location}</p>
														</div>
														<div className="job-action">
																<Link to={`/job/${job._id}`} className="view-details-btn">View Details</Link>
														</div>
												</div>
										))}
								</div>
						)}
				</div>
		);
};

export default JobListing;
