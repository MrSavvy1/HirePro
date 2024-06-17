import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobListing.css';

const JobListing = () => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const fetchJobs = async () => {
			const response = await axios.get('/api/jobs');
			setJobs(response.data);
		};
		fetchJobs();
	}, []);

	return (
		<div className="job-listing-container">
			<h2>Available Jobs</h2>
			<ul>
				{jobs.map(job => (
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
