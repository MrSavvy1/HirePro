// JobPostingPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const JobPostingPage = () => {
		const [title, setTitle] = useState('');
		const [description, setDescription] = useState('');
		const [location, setLocation] = useState('');
		const [experienceLevel, setExperienceLevel] = useState('');
		const history = useHistory();

		useEffect(() => {
				const user = JSON.parse(localStorage.getItem('user'));
				if (user.role !== 'Company') {
						history.push('/'); // Redirect to home if not a company
				}
		}, [history]);

		const handleSubmit = async (e) => {
				e.preventDefault();
				try {
						const response = await axios.post('/api/jobs', { title, description, location, experienceLevel });
						console.log('Job posted successfully:', response.data);
				} catch (error) {
						console.error('Error posting job:', error);
				}
		};

		return (
				<form onSubmit={handleSubmit}>
						<label>
								Title:
								<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
						</label>
						<label>
								Description:
								<textarea value={description} onChange={(e) => setDescription(e.target.value)} />
						</label>
						<label>
								Location:
								<input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
						</label>
						<label>
								Experience Level:
								<input type="text" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} />
						</label>
						<button type="submit">Post Job</button>
				</form>
		);
};

export default JobPostingPage;
