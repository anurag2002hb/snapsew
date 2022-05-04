
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  p1: {
    type: String,
    required: true
  },
  p2: {
    type: String,
    required: true
  },
  p3: {
    type: String,
    required: true
  },
  p4: {
    type: String,
    required: true
  },
  p5: {
    type: String,
    required: true
  },
  p6: {
    type: String,
    required: true
  },
  p7: {
    type: String,
    required: true
  },
  p8: {
    type: String,
    required: true
  },
  p9: {
    type: String,
    required: true
  },
  object: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Service', serviceSchema);
