// client/src/components/WhoAreYou.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WhoAreYou.css';

const WhoAreYou = ({ setRole }) => {
	const navigate = useNavigate();

	const handleRoleSelection = (role) => {
		setRole(role);
		navigate('/signup');
	};

	return (
		<div className="whoareyou-container">
			<h2>Who Are You?</h2>
			<button onClick={() => handleRoleSelection('Employee')}>Employee</button>
			<button onClick={() => handleRoleSelection('Company')}>Company</button>
		</div>
	);
};

export default WhoAreYou;
