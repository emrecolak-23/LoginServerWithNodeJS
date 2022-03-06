// Packages
const express = require('express');
const router = express.Router();

// Controller
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/refresh-token', AuthController.resfreshToken);

module.exports = router;
