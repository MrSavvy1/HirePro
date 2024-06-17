import React, { useState } from 'react';
import axios from 'axios';
import './PostJob.css';

const PostJob = () => {
	const [formData, setFormData] = useState({ title: '', description: '' });

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post('/api/jobs', formData);
		alert('Job posted successfully!');
	};

	return (
		<div className="post-job-container">
			<h2>Post a Job</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Job Title"
					value={formData.title}
					onChange={handleChange}
					required
				/>
				<textarea
					name="description"
					placeholder="Job Description"
					value={formData.description}
					onChange={handleChange}
					required
				/>
				<button type="submit">Post Job</button>
			</form>
		</div>
	);
};

export default PostJob;
