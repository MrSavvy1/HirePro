// client/src/components/WhoAreYou.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import './WhoAreYou.css';

const WhoAreYou = ({ setRole }) => {
	const navigate = useNavigate();

	const handleRoleSelection = (role) => {
		setRole(role);
		navigate('/signup');
	};

	return (
		<div className="who-are-you">
		<div className="whoareyou-container">
			<Link to="/">
					<img src={logo} alt="HirePro Logo" className="logo-img" />
			</Link>

			<h2>Who Are You?</h2>
			<button onClick={() => handleRoleSelection('Regular')}>Employee</button>
			<button onClick={() => handleRoleSelection('Company')}>Company</button>
		</div>
		</div>
	);
};

export default WhoAreYou;
