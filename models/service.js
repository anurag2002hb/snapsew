
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  p1: {
    type: String
  },
  p2: {
    type: String
  },
  p3: {
    type: String
  },
  p4: {
    type: String
  },
  p5: {
    type: String
  },
  p6: {
    type: String
  },
  p7: {
    type: String
  },
  p8: {
    type: String
  },
  p9: {
    type: String
  },
  object: {
    type: String
  }
});


module.exports = mongoose.model('Service', serviceSchema);
