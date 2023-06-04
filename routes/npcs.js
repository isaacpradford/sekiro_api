const express = require('express');
const router = express.Router();
const npcController = require('../controllers/npcs');

// Validation
const { npcValidation } = require('../validation/npcValidation')

// Routes to return data for NPCs
router.get('/', npcController.getAllNPCs);
router.get('/:id', npcController.getSingleNPC);

// Routes to add data
router.post('/', 
    npcValidation,
    npcController.addNPC   
)
router.put('/:id', 
    npcValidation,
    npcController.updateNPC
)

// Delete NPC
router.delete('/:id', 
    npcController.deleteNPC 
)

module.exports = router;