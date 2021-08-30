const mongoose = require('mongoose');
// const { INTEGER } = require('sequelize/types');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  services: [
    {
      service: { type: Object, required: true, ref: 'Service' }
    }
  ],
  // address: {
  //   fullName: {
  //     type: String
  //   },
  //   phoneNo: {
  //     type: INTEGER
  //   },
  //   pincode: {
  //     type: INTEGER
  //   },
  //   flat: {
  //     type: String
  //   },
  //   building: {
  //     type: String
  //   },
  //   address: {
  //     type: String
  //   }

  // },
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
  pincode: {
    type: Number,
    required: true
  },
  add: {
    type: String,
    required: true
  }
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
