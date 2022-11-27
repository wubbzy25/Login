const express = require('express')
const router = express.Router()
const path = require('path')
const logincontrollers = require('../controllers/logincontrollers')

router.get('/login', logincontrollers.index);
router.post('/login', logincontrollers.register);

module.exports = router;
