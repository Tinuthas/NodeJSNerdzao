const joi = require('joi');

// const memberSchema = joi.object().keys({
//     nome: joi.string(),
//     regiao: joi.number().integer()
// });

const schema = joi.object().keys({
    nome: joi.string().min(1).max(20),
    regiao: joi.string().min(3).max(8),
    
});

module.exports = schema;

// const feature = "a";
// module.exports = feature;