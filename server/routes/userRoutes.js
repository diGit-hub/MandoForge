const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const authMiddleware = require('../middleware/auth');

router.post('/auth/register', register);
router.post('/auth/login', authMiddleware.rateLimit, login);

module.exports = router;