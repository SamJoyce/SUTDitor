const mongoose = require('mongoose');

let TreeSchema = new Schema({
  root: [
    {
      id: mongoose.Schema.Types.ObjectId,
      children: [
        {
          id: mongoose.Schema.Types.ObjectId,
          children: Array
        }
      ]
    }
  ]
});

module.exports = mongoose.models('Tree', TreeSchema);
