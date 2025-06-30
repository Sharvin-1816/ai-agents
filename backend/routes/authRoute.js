const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {signup,login,forgotPassword,resetPassword,getMe} = require('../controllers/authController');

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);
router.get('/me',authenticate,getMe);

module.exports = router;