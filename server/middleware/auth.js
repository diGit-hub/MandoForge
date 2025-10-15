const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

const rateLimiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 100,
    message: 'Too many requests, please try again later.'
});

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) res.status(401).json({ message: "No token provided." });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token"} );
    }
};

module.exports = { rateLimit: rateLimiter, authenticateJWT };