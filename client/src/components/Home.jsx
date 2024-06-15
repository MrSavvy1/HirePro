import React from 'react';
import Header from './Header';

const Home = ({ setPage }) => {
	return (
		<div className="container">
			<Header setPage={setPage} />
			<div className="content">
				<h1>Welcome to HirePro</h1>
			</div>
		</div>
	);
};

export default Home;
