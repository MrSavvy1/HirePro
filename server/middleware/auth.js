// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
		if (typeof roles === 'string') {
				roles = [roles];
		}

		return (req, res, next) => {
				const token = req.header('x-auth-token');
				if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

				try {
						const decoded = jwt.verify(token, 'secret_key');
						if (roles.length && !roles.includes(decoded.role)) {
								return res.status(401).json({ message: 'Role not authorized' });
						}
						req.user = decoded;
						next();
				} catch (error) {
						res.status(400).json({ message: 'Token is not valid' });
				}
		};
};

module.exports = auth;
