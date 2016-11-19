const mongoose = require('mongoose');

let TreeSchema = new mongoose.Schema({
  Object
});

module.exports = mongoose.models('Tree', TreeSchema);
