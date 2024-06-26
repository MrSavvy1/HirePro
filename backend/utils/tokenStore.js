// tokenStore.js
let token = null;

const setToken = (newToken) => {
		token = newToken;
};

const getToken = () => token;

module.exports = { setToken, getToken };
