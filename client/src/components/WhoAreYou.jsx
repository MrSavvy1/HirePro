import React from 'react';

const WhoAreYou = ({ setRole }) => {
	return (
		<div className="container form-container">
			<h2>Who Are You?</h2>
			<button onClick={() => setRole('Employee')}>Employee</button>
			<button onClick={() => setRole('Company')}>Company</button>
		</div>
	);
};

export default WhoAreYou;
