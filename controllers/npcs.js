const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const logger = require('../logging/logger');

// Validation
const npcSchema = require('../validation/npcValidation')
const validator = require('express-joi-validation').createValidator({})

const getAllNPCs = async(req, res, next) => {
    try {
        const result = await mongodb
        .getDb()
        .db('sekiro')
        .collection('npcs')
        .find();
    
        result.toArray().then((lists) => {
            res.status(200).json(lists);
        });
    } catch {
        logger.error("Error getting list of NPCs.")
        res.sendStatus(500);
    }
};

const getSingleNPC = async(req, res, next) => {
    try {
        const result = await mongodb
            .getDb()
            .db('sekiro')
            .collection('npcs')
            .findOne({_id: new ObjectId(req.params.id) });

            res.send(result).status(200);
            if (!result) {
                logger.error("There was no result.")
            }
    } catch (error) {
        logger.error("Error getting single NPC.")
        res.sendStatus(500);
    }
}

const addNPC = async (req, res) => {
    try { 
        const npc = {
            name: req.body.name,
            characterType: req.body.characterType,
            image: req.body.image,
            quotes: req.body.quotes,
            description: req.body.description,
            location: req.body.location
        }

        const response = await mongodb
        .getDb()
        .db('sekiro')
        .collection('npcs')
        .insertOne(npc);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'An error occurred while creating the NPC.');
        }
    } catch (error) 
    { 
        logger.error("Error adding an NPC.")
        res.sendStatus(500)
    }
}

const updateNPC = async(req, res) => {
    try {
        const npc = {
            name: req.body.name,
            characterType: req.body.characterType,
            image: req.body.image,
            quotes: req.body.quotes,
            description: req.body.description,
            location: req.body.location
        }
    
        const response = await mongodb
          .getDb()
          .db('sekiro')
          .collection('npcs')
          .replaceOne({ _id: new ObjectId(req.params.id)}, npc);
    
          if (response.modifiedCount > 0) {
            res.status(201).json(response);
          } else {
            res.status(500).json(response.error || 'Some error occurred while updating the NPC.');
          }
    } catch(error) {
        logger.error(error.description)
        res.sendStatus(500)
    }
}

const deleteNPC = async (req, res) => {
    try {
        const response = await mongodb
        .getDb()
        .db('sekiro')
        .collection('npcs')
        .deleteOne({ _id: new ObjectId(req.params.id)}, true);
    
        console.log(response);
        if (response.deletedCount > 0) {
          res.status(201).send();
        } else {
          res.status(500).json(response.error || 'Some error occurred while deleting the NPC.');
        }
    } catch (error) {
        logger.error("Error deleting an NPC.")
        res.sendStatus(500)
    }
}

module.exports = { getAllNPCs, addNPC, getSingleNPC, updateNPC, deleteNPC }