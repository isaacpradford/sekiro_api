const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'))
router.use('/npcs', require('./npcs'));

module.exports = router;