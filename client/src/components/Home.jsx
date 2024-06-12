import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<h1>Welcome to HirePro</h1>
				
			</div>
		</div>
	);
};

export default Home;
