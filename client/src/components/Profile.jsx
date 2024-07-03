import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import pro from '../assets/list.png';

const Profile = () => {
		const [user, setUser] = useState(null);
		const [isLoading, setIsLoading] = useState(true);
		const [isEditing, setIsEditing] = useState(false);
		const [error, setError] = useState('');
		const navigate = useNavigate();

		useEffect(() => {
				const fetchUserDetails = async () => {
						try {
								const response = await axios.get('https://hirepro-s561.onrender.com/api/mydata');
								setUser(response.data.data);
						} catch (error) {
								setError('Error fetching user details. Please try again later.');
								console.error('Error fetching user details:', error);
						} finally {
								setIsLoading(false);
						}
				};

				fetchUserDetails();
		}, []);

		const handleLogout = async () => {
				try {
						await axios.get('https://hirepro-s561.onrender.com/api/logout'); 
						localStorage.removeItem('token');
						localStorage.removeItem('userId');
						navigate('/'); 
				} catch (error) {
						setError('Error logging out. Please try again.');
						console.error('Error logging out:', error);
				}
		};

		const handleEdit = () => {
				setIsEditing(true);
		};

		const handleSave = async () => {
				try {
						await axios.put(`https://hirepro-s561.onrender.com/api/user/updateprofile`, user);
						setIsEditing(false);
				} catch (error) {
						setError('Error saving profile. Please try again later.');
						console.error('Error saving profile:', error);
				}
		};

		const handleChange = (e) => {
				setUser({ ...user, [e.target.name]: e.target.value });
		};

		if (isLoading) {
				return <p>Loading profile...</p>;
		}

		return (
				<div className="profile">
						<img src={pro} alt="Profile Picture" className="profile-picture" />
						<div className="profile-container">
								<h2>Profile</h2>
								{error && <p style={{ color: 'red' }}>{error}</p>}
								{user && (
										<div>
												<div className="profile-field">
														<label>Name:</label>
														{isEditing ? (
																<input type="text" name="name" value={user.name} onChange={handleChange} />
														) : (
																<p>{user.name}</p>
														)}
												</div>
												<div className="profile-field">
														<label>Email:</label>
														{isEditing ? (
																<input type="email" name="email" value={user.email} onChange={handleChange} />
														) : (
																<p>{user.email}</p>
														)}
												</div>
												<div className="profile-field">
														<label>Role:</label>
														<p>Regular</p>
												</div>
												<div className="profile-field">
														<label>Experience:</label>
														{isEditing ? (
																<textarea name="experience" value={user.experience} onChange={handleChange}></textarea>
														) : (
																<p>{user.experience}</p>
														)}
												</div>
												<div className="profile-field">
														<label>Education:</label>
														{isEditing ? (
																<textarea name="education" value={user.education} onChange={handleChange}></textarea>
														) : (
																<p>{user.education}</p>
														)}
												</div>
												<div className="profile-field">
														<label>Skills:</label>
														{isEditing ? (
																<textarea name="skills" value={user.skills} onChange={handleChange}></textarea>
														) : (
																<p>{user.skills}</p>
														)}
												</div>
												<div className="profile-field">
														<label>Achievements:</label>
														{isEditing ? (
																<textarea name="achievements" value={user.achievements} onChange={handleChange}></textarea>
														) : (
																<p>{user.achievements}</p>
														)}
												</div>
												<div className="profile-field">
														<label>Password:</label>
														{isEditing ? (
																<input type="password" name="password" value={user.password} onChange={handleChange} />
														) : (
																<p>******</p>
														)}
												</div>
												{isEditing ? (
														<button onClick={handleSave}>Save</button>
												) : (
														<button onClick={handleEdit}>Edit Profile</button>
												)}
												<button onClick={handleLogout}>Logout</button>
										</div>
								)}
						</div>
				</div>
		);
};

export default Profile;
