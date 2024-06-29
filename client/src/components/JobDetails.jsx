import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
		const { id } = useParams();
		const [job, setJob] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState('');
		const [cover, setCover] = useState('');
		const [cv, setCv] = useState(null);

		useEffect(() => {
				const fetchJob = async () => {
						try {
								const response = await axios.get(`https://hirepro-s561.onrender.com/api/job/${id}`);
								if (response.data.success) {
										setJob(response.data.data);
								} else {
										setError('Unexpected data format from API');
								}
						} catch (error) {
								setError('Error fetching job details');
						} finally {
								setLoading(false);
						}
				};

				fetchJob();
		}, [id]);

		const handleCoverChange = (e) => {
				setCover(e.target.value);
		};

		const handleCvChange = (e) => {
				setCv(e.target.files[0]);
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				const formData = new FormData();
				formData.append('jobId', id);
				formData.append('employerId', job.userId);
				formData.append('cover', cover);
				formData.append('cv', cv);

				try {
						await axios.post(`https://hirepro-s561.onrender.com/api/uploadapplyjob`, formData, {
								headers: {
										'Content-Type': 'multipart/form-data',
								},
						});
						alert('Application submitted successfully');
				} catch (error) {
						console.error('Error submitting application:', error);
				}
		};

		if (loading) {
				return <p>Loading...</p>;
		}

		if (error) {
				return <p>{error}</p>;
		}

		return (
				<div className="job-details-container">
						<h2>Job Details</h2>
						{job && (
								<>
										<p><strong>Title:</strong> {job.title}</p>
										<p><strong>Description:</strong> {job.description}</p>
										<p><strong>Location:</strong> {job.location}</p>
										<p><strong>Salary:</strong> {job.salary}</p>
										<p><strong>Date Posted:</strong> {job.datePosted}</p>
										<p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
								</>
						)}
						<form onSubmit={handleSubmit}>
								<label>Cover Letter:</label>
								<textarea name="cover" value={cover} onChange={handleCoverChange} required></textarea>

								<label>Upload CV (PDF only):</label>
								<input type="file" name="cv" accept=".pdf" onChange={handleCvChange} required />

								<button type="submit">Submit Application</button>
						</form>
				</div>
		);
};

export default JobDetails;
