const express = require('express');
const router = express.Router();

const {login, verificaCodigo} = require('../controllers/userControllers');

router.post('/login', login);
router.post('/otp', verificaCodigo);

module.exports = router;