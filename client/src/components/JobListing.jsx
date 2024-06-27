import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobListing.css';


const JobListing = () => {
		const [jobs, setJobs] = useState([]); // Ensure jobs state is initialized as an array

		useEffect(() => {
				const fetchJobs = async () => {
						try {
								const response = await axios.get('/api/jobs');
								setJobs(response.data);
						} catch (error) {
								console.error('Error fetching jobs:', error);
						}
				};

				fetchJobs();
		}, []);

		// Ensure jobs is always an array before mapping
		if (!Array.isArray(jobs)) {
				return (
						<div className="job-listing-container">
								<h2>Available Jobs</h2>
								<p>No jobs available at the moment.</p>
						</div>
				);
		}

		return (
				<div className="job-listing-container">
						<h2>Available Jobs</h2>
						<ul>
								{jobs.map((job) => (
										<li key={job.id}>
												<h3>{job.title}</h3>
												<p>{job.description}</p>
												<button>Apply</button>
										</li>
								))}
						</ul>
				
				</div>
		);
};

export default JobListing;
