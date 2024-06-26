// client/src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
	const navigate = useNavigate();

	return (
		<header className="header">
			<div className="logo">
				<h2>HirePro</h2>
			</div>
			<div className="navigation">
				<button onClick={() => navigate('/whoAreYou')}>Sign Up</button>
				<button onClick={() => navigate('/login')}>Login</button>
			</div>
		</header>
	);
};

export default Header;
