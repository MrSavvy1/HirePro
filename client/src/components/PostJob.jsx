import React, { useState } from 'react';
import axios from 'axios';
import './PostJob.css';

const PostJob = () => {
		const [job, setJob] = useState({
				title: '',
				description: '',
				location: '',
				available: true,
				salary: '',
				userId: '', // Assuming this will be handled on the server-side
				datePosted: new Date(),
				applicationDeadline: '',
				jobCategory: ''
		});

		const handleChange = (e) => {
				const { name, value } = e.target;
				setJob({
						...job,
						[name]: value
				});
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				try {
						await axios.post('https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:8000/api/jobs', job);
						alert('Job posted successfully!');
				} catch (error) {
						console.error('Error posting job:', error);
						alert('Failed to post job');
				}
		};

		return (
				<div className="post-job-container">
						<h2>Post a Job</h2>
						<form onSubmit={handleSubmit}>
								<div>
										<label>Job Title</label>
										<input type="text" name="title" value={job.title} onChange={handleChange} required />
								</div>
								<div>
										<label>Location</label>
										<input type="text" name="location" value={job.location} onChange={handleChange} required />
								</div>
								{/* Assuming "available" is a checkbox */}
								<div>
										<label>Available</label>
										<input type="checkbox" name="available" checked={job.available} onChange={(e) => setJob({ ...job, available: e.target.checked })} />
								</div>
								<div>
										<label>Job Description</label>
										<textarea name="description" value={job.description} onChange={handleChange} required></textarea>
								</div>
								<div>
										<label>Salary</label>
										<input type="text" name="salary" value={job.salary} onChange={handleChange} required />
								</div>
								<div>
										<label>Date Posted</label>
										<input type="date" name="datePosted" value={job.datePosted} onChange={handleChange} required />
								</div>
								<div>
										<label>Application Deadline</label>
										<input type="date" name="applicationDeadline" value={job.applicationDeadline} onChange={handleChange} required />
								</div>
								<div>
										<label>Job Category</label>
										<input type="text" name="jobCategory" value={job.jobCategory} onChange={handleChange} required />
								</div>
								<button type="submit">Post Job</button>
						</form>
				</div>
			
		);
};

export default PostJob;
