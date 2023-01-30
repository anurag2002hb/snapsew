const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  services: [
    {
      service: { type: Object, required: true, ref: 'Service' }
    }
  ],
  user: {
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  name: {
    type: String
  },
  phone: {
    type: Number
  },
  landmark: {
    type: String
  },
  city: {
    type: String
  },
  pincode: {
    type: Number
  },
  address: {
    type: String
  },
  optionalPhone: {
    type: Number
  },
});

module.exports = mongoose.model('Order', orderSchema);

// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const orderSchema = new Schema({
//   products: [
//     {
//       product: { type: Object, required: true },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   user: {
//     email: {
//       type: String,
//       required: true
//     },
//     userId: {
//       type: Schema.Types.ObjectId,
//       required: true,
//       ref: 'User'
//     }
//   }
// });

// module.exports = mongoose.model('Order', orderSchema);
