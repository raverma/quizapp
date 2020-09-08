const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const questionSchema = mongoose.Schema({
    type: {type: String, required: true},
    category: {type: String, required: true },
    text: {type: String, require: true},
    maxScore: {type: Number, required: true},
    imagePath: {type: String, required: false}

});

questionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', questionSchema);