const express = require('express');
const authController = require('../../controllers/auth.controller');
const upload = require('../../utils/upload.util');

const router = express.Router();

router.post('/signup', upload.single('image'), authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
