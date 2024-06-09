// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
		return (
				<div>
						<h1>Welcome to Job Listing App</h1>
						<button><Link to="/signup">Sign Up</Link></button>
						<button><Link to="/login">Login</Link></button>
				</div>
		);
}

export default HomePage;
