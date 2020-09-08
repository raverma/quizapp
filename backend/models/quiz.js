const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const quizSchema = mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: false},
    instructions: { type: String, required: false}
});

quizSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', quizSchema);