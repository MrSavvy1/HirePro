import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyJobs.css';

const CompanyJobs = () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userId, setUserId] = useState(null);
	const [cvs, setCvs] = useState({});

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				console.log('Fetching user data...');
				const userResponse = await axios.get('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/mydata');
				console.log('User Data:', userResponse.data);
				const userId = userResponse.data.id;
				setUserId(userId);

				console.log('Fetching all jobs...');
				const jobsResponse = await axios.get('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/alljobs');
				console.log('Jobs Data:', jobsResponse.data);

				const filteredJobs = jobsResponse.data.data.filter(job => job.userId === userId);
				console.log('Filtered Jobs:', filteredJobs);
				setJobs(filteredJobs);

				// Fetch CVs for each job
				const cvPromises = filteredJobs.map(job =>
					axios.get(`https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/getcv/${job.id}`)
				);
				const cvResponses = await Promise.all(cvPromises);
				const cvData = cvResponses.reduce((acc, cvResponse, index) => {
					acc[filteredJobs[index].id] = cvResponse.data;
					return acc;
				}, {});
				console.log('CV Data:', cvData);
				setCvs(cvData);

				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setError('Failed to fetch data. Please try again.');
				setLoading(false);
			}
		};
		fetchUserData();
	}, []);

	return (
		<div className="company-jobs-container">
			<h2>Posted Jobs</h2>
			{loading && <p>Loading jobs...</p>}
			{error && <p className="error">{error}</p>}
			<ul>
				{jobs.map(job => (
					<li key={job.id} className="job-item">
						<h3>{job.title}</h3>
						{cvs[job.id] ? (
							<a href={`https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/getcv/${job.id}`} download>
								Download CV
							</a>
						) : (
							<p>No CV available</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CompanyJobs;
