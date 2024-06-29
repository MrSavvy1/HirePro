import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import pro from '../assets/list.png';

const Profile = () => {
		const [user, setUser] = useState(null);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState('');
		const navigate = useNavigate();

		useEffect(() => {
				const fetchUserDetails = async () => {
						try {
								const response = await axios.get('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/mydata');
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
						await axios.get('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:8000/api/logout'); // Adjust logout API endpoint as per your backend
						localStorage.removeItem('token');
						localStorage.removeItem('userId');
						navigate('/'); // Navigate to home or login page after logout
				} catch (error) {
						setError('Error logging out. Please try again.');
						console.error('Error logging out:', error);
				}
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
										<p>Name: {user.name}</p>
										<p>Email: {user.email}</p>
										<p>Role: Regular</p>
										<button onClick={handleLogout}>Logout</button>
								</div>
						)}
				</div>
			</div>
		);
};

export default Profile;
