import React from 'react';

const Home = ({ setPage }) => {
	return (
		<div className="container">
			<h1>Welcome to Our Service</h1>
			<button onClick={() => setPage('whoAreYou')}>Sign Up</button>
			<button onClick={() => setPage('login')}>Login</button>
		</div>
	);
};

export default Home;
