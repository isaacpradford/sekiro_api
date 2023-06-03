const joi = require('joi');
joi.objectId = require('joi-objectid')(joi)

const npcSchema = joi.object({
    id:  joi.objectId(),
    name: joi.string().min(1).max(50).required(),
    characterType: joi.string().min(1).max(50).optional(),
    image: joi.string().required(),
    quotes: joi.array().items(joi.string().min(1).max(200)).optional(),
    description: joi.string().min(1).max(300).required(),
    location: joi.string().min(1).max(50).required(),
});

module.exports = { 
    npcValidation: async(req, res, next) => {
        const value = await npcSchema.validate(req.body);
    if (value.error) {
        res.json({
            success: 0,
            message: value.error.details[0].message
        })
    } else {
        next();
    }
} };
