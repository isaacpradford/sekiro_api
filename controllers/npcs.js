const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAllNPCs = async(req, res, next) => {
    const result = await mongodb
    .getDb()
    .db('sekiro')
    .collection('npcs')
    .find();

    result.toArray().then((lists) => {
        res.status(200).json(lists);
    });
};

const addNPC = async (req, res) => {
    const npc = {
        name: req.body.name,
        characterType: req.body.characterType,
        image: req.body.image,
        quotes: req.body[quote],
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
}

module.exports = { getAllNPCs, addNPC }