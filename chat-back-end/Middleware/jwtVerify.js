const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        console.error('Authentication token not provided');
        return res.status(401).json({ error: 'Authentication required' });
    }
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        console.error('Invalid token format');
        return res.status(403).json({ error: 'Invalid token format' });
    }
    const tokenValue = tokenParts[1];
    jwt.verify(tokenValue, secretKey, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err.message);
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.auth_id = decoded.userId;
        next();
    });
}

module.exports = { authenticateToken };