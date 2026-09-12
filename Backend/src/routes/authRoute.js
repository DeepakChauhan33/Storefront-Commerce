const express = require('express');
const router = express.Router();


// Importing Authentication Controllers
const { register, getSignInForm, loginForm, login, getCurrentUser } = require('../controllers/authController');

const authMiddleware = require('../middleware/authMiddleware');




router.get('/sign-in', getSignInForm);

router.post('/register', register);

router.get('/login', loginForm);

router.post('/login', login);

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;