import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './contexts/AuthContext';

const Profile = () => {
		const { user } = useContext(AuthContext);
		const [profile, setProfile] = useState({
				image: '', experience: '', education: '', about: '', achievements: '', jobTitle: ''
		});
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState('');

		useEffect(() => {
				const fetchProfile = async () => {
						try {
								const response = await axios.get(`/api/profile/${user.id}`, {
										headers: {
												'Authorization': `Bearer ${localStorage.getItem('token')}`
										}
								});
								setProfile(response.data);
						} catch (error) {
								setError('Error fetching profile. Please try again later.');
								console.error('Error fetching profile:', error);
						} finally {
								setIsLoading(false);
						}
				};
				fetchProfile();
		}, [user.id]);

		const handleChange = (e) => {
				setProfile({ ...profile, [e.target.name]: e.target.value });
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				try {
						const updatedProfile = { ...profile }; // Make a copy to prevent direct mutation
						// Example validation (you can implement more specific checks)
						if (updatedProfile.experience.trim() === '') {
								setError('Experience field cannot be empty.');
								return;
						}
						await axios.put(`/api/profile/${user.id}`, updatedProfile, {
								headers: {
										'Authorization': `Bearer ${localStorage.getItem('token')}`
								}
						});
						alert('Profile updated successfully.');
				} catch (error) {
						setError('Error updating profile. Please try again later.');
						console.error('Error updating profile:', error);
				}
		};

		if (isLoading) {
				return <p>Loading profile...</p>;
		}

		return (
				<div>
						<h2>Profile</h2>
						{error && <p style={{ color: 'red' }}>{error}</p>}
						<form onSubmit={handleSubmit}>
								<input type="file" name="image" onChange={handleChange} />
								<input type="text" name="experience" placeholder="Experience" value={profile.experience} onChange={handleChange} />
								<input type="text" name="education" placeholder="Education" value={profile.education} onChange={handleChange} />
								<textarea name="about" placeholder="About" value={profile.about} onChange={handleChange} />
								<textarea name="achievements" placeholder="Achievements" value={profile.achievements} onChange={handleChange} />
								<input type="text" name="jobTitle" placeholder="Job Title" value={profile.jobTitle} onChange={handleChange} />
								<button type="submit">Update Profile</button>
						</form>
				</div>
		);
};

export default Profile;
