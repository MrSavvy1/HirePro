import React from 'react';

const WhoAreYou = ({ setRole }) => {
	return (
		<div className="form-container">
			<h2>Who are you?</h2>
			<button onClick={() => setRole('employee')}>Employee</button>
			<button onClick={() => setRole('company')}>Company</button>
		</div>
	);
};

export default WhoAreYou;
