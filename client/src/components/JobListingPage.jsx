// JobListingsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const JobListingsPage = () => {
		const [jobs, setJobs] = useState([]);
		const history = useHistory();

		useEffect(() => {
				const user = JSON.parse(localStorage.getItem('user'));
				if (user.role !== 'Employee') {
						history.push('/'); // Redirect to home if not an employee
				}
		}, [history]);

		useEffect(() => {
				const fetchJobs = async () => {
						const response = await axios.get('/api/jobs');
						setJobs(response.data);
				};
				fetchJobs();
		}, []);

		return (
				<div>
						<h1>Current Openings</h1>
						{jobs.map(job => (
								<div key={job._id}>
										<h2>{job.title}</h2>
										<p>{job.location}</p>
										<Link to={`/jobs/${job._id}`}>View details</Link>
								</div>
						))}
				</div>
		);
};

export default JobListingsPage;
