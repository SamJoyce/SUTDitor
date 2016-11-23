const mongoose = require('mongoose');

let TreeSchema = new mongoose.Schema({}, {strict: false});

module.exports = mongoose.model('Tree', TreeSchema);
