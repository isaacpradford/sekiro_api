const express = require('express');
const router = express.Router();

const npcController = require('../controllers/npcs')

// Routes to return data for NPCs
router.get('/', npcController.getAllNPCs);

// Routes to post data
router.post('/', npcController.addNPC)

module.exports = router;