const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../authorization/auth')

router.use('/', require('./auth'))
router.use('/', isLoggedIn, require('./swagger'))
router.use('/npcs', isLoggedIn, require('./npcs'));

module.exports = router;