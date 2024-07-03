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
								const userResponse = await axios.get('https://bc31de55-c8d5-4f5a-985d-ea51ad50d9c5-00-g9e9jj3pmgbl.worf.replit.dev:5000/api/mydata');
								console.log('User Data:', userResponse.data);
								const userId = userResponse.data.data._id;
								setUserId(userId);

								console.log('Fetching job applications...');
								const applicationsResponse = await axios.get('https://bc31de55-c8d5-4f5a-985d-ea51ad50d9c5-00-g9e9jj3pmgbl.worf.replit.dev:5000/api/jobapplications');
								console.log('Applications Data:', applicationsResponse.data);

								const userApplications = applicationsResponse.data.data.filter(application => application.employerId === userId);
								console.log('User Applications:', userApplications);
								setJobs(userApplications);

								
								const cvPromises = userApplications.map(application =>
										axios.get(`https://hirepro-s561.onrender.com/api/getcv/${application._id}`)
								);
								const cvResponses = await Promise.all(cvPromises);
								const cvData = cvResponses.reduce((acc, cvResponse, index) => {
										acc[userApplications[index]._id] = cvResponse.data;
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
			<div className="company-jobs">
				<div className="company-jobs-container">
						<h2>Job Applications</h2>
						{loading && <p>Loading applications...</p>}
						{error && <p className="error">{error}</p>}
						<ul>
								{jobs.map(application => (
										<li key={application._id} className="job-item">
												<h3>Job ID: {application.jobId}</h3>
												<p>Applicant ID: {application.userId}</p>
												<p>Cover Letter: {application.cover}</p>
												{cvs[application._id] ? (
														<a href={`https://hirepro-s561.onrender.com/api/getcv/${application._id}`} download>
																Download CV
														</a>
												) : (
														<p>No CV available</p>
												)}
										</li>
								))}
						</ul>
				</div>
			</div>
		);
};

export default CompanyJobs;
