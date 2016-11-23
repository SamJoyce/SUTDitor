const mongoose = require('mongoose');

let NodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  src: { type: String, required: true },
  parents: [ mongoose.Schema.Types.ObjectId ],
});

module.exports = mongoose.model('Node', NodeSchema);
