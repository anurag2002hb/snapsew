const Service = require('../models/service');
const Order = require('../models/order');
const User = require('../models/user');
const service = require('../models/service');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator/check');

exports.postChekoutService = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const landmark = req.body.landmark;
  const city = req.body.city;
  const pincode = req.body.pincode;
  const address = req.body.address;
  const optionalPhone = req.body.optionalPhone;

  // const pin = req.body.pin;
  // const title = req.body.title;

  req.user
    .populate('basket.things.serviceId')
    .execPopulate()
    .then(user => {
      const services = user.basket.things.map(i => {
        return {service: { ...i.serviceId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        services: services,

        name: name,
        phone: phone,
        landmark: landmark,
        city: city,
        pincode: pincode,
        address: address,
        optionalPhone: optionalPhone,

      });
      return order.save();
    })
    .then(result => {
      return req.user.clearBasket();
    })
    .then(() => {
      res.redirect('/check-tailor-orders');
    })
    .catch(err => console.log(err));
};

exports.getPreCheckout = (req, res, next) => {
  res.render('tailor/precheckout', {
        pageTitle: 'Pre Checkout',
        path: '/products',
        banner: 'Pre-Checkout'
      })
};

exports.getAddres = (req, res, next) => {
  res.render('tailor/addres', {
        pageTitle: 'addres',
        path: '/products',
        banner: 'Pre-Checkout'
      })
};


exports.postAddres = (req, res, next) => {
  const userId = req.user._id
  const pin = req.body.pin;
  const title = req.body.title;
  console.log(userId);
  User.findById(userId)
    .then(user => {
      console.log(user.address.pincode);
      user.address.add = title;
      user.address.pincode = pin;
      return user.save()
      .then(result => {
          console.log('UPDATED user!');
          res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};


exports.getMyTailorOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('tailor/tailor-orders', {
        path: '/orders',
        pageTitle: 'Tailors Orders',
        orders: orders,
        banner: 'Orders'
      });
    })
    .catch(err => console.log(err));
};

exports.getTailorOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('tailor/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        banner: 'Orders'
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  console.log('what the fuck is going on here');

    req.user
  .populate('basket.things.serviceId')
  .execPopulate()
  .then(user => {
    const services = user.basket.things;
    res.render('tailor/c', {
      path: '/basket',
      pageTitle: 'Your Basket',
      services: services,
      banner: 'Checkout'
    });
  })
  .catch(err => console.log(err));

};

exports.getTailorCart = (req, res, next) => {
  req.user
  .populate('basket.things.serviceId')
  .execPopulate()
  .then(user => {
    const services = user.basket.things;
    console.log(services);
    res.render('tailor/cart', {
      path: '/basket',
      pageTitle: 'Your Basket',
      services: services,
      banner: 'Cart'
    });
  })
  .catch(err => console.log(err));
};


exports.getTailor = (req, res, next) => {
  res.render('tailor/check', {
        pageTitle: 'All Products',
        path: '/products'
      })
};

exports.getTailorBasket = (req, res, next) => {
  res.render('tailor/my-basket', {
        pageTitle: 'All Products',
        path: '/products',
        banner: 'Cart'
      })
};

exports.getTailorProducts = (req, res, next) => {
  res.render('tailor/tailor-products', {
        pageTitle: 'All Products',
        path: '/products',
        banner: 'Services'
      })
};

exports.postDeleteService = (req, res, next) => {
  const servId = req.body.serviceId;
  Service.deleteOne({ _id: servId, userId: req.user._id })
    .then(() => {
      console.log('DESTROYED SERVICE');
      res.redirect('/services');
    })
    .catch(err => console.log(err));
};


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postBasketDeleteService = (req, res, next) => {
  const servId = req.body.serviceId;
  req.user
    .removeFromBasket(servId)
    .then(result => {
      res.redirect('/tailor-cart');
    })
    .catch(err => console.log(err));
};

exports.getTailorSignIn = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  } else {
    message = null;
  }
  res.render('tailor/signin', {
        pageTitle: 'Sign',
        path: '/products',
        banner: 'Sign-in',
        errorMessage: message,
        oldInput: {
          email: '',
          password: ''
        },
        validationErrors: []
      });
};

exports.getTailorSignUp = (req, res, next) => {
  let message = req.flash('error');
  if(message.length > 0){
    message = message[0];
  } else {
    message = null;
  }
  res.render('tailor/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    banner: 'Sign-up',
    errorMessage: message,
    oldInput: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationErrors: []
  });
};

// exports.getCart = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .execPopulate()
//     .then(user => {
//       const products = user.cart.items;
//       res.render('shop/cart', {
//         path: '/cart',
//         pageTitle: 'Your Cart',
//         products: products
//       });
//     })
//     .catch(err => console.log(err));
// };


///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// various forms //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

exports.getPantCustomization = (req, res, next) => {
  res.render('tailor/common-form2', {
    pageTitle: 'Common Customization',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getShirtCustomization = (req, res, next) => {
  res.render('services/common-form', {
    pageTitle: 'Common Customization',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postShirtCustomization = (req, res, next) => {
  const p1 = req.body.p1;
  const p2 = req.body.p2;
  const p3 = req.body.p3;
  const p4 = req.body.p4;
  const p5 = req.body.p5;
  const p6 = req.body.p6;

  const p7 = req.body.p7;
  const p8 = req.body.p8;
  const p9 = req.body.p9;
  const object = req.body.object;
  const service = new Service({
    userId: req.user,
     p1: p1,
     p2: p2,
     p3: p3,
     p4: p4,
     p5: p5,
     p6: p6,
     p7: p7,
     p8: p8,
     p9: p9,
     object: object
  });
  service
    .save()
    .then(result => {
      console.log('Created Service');
      res.redirect('/admin/services');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postBlouseCustomization = (req, res, next) => {
  const p1 = req.body.p1;
  const p2 = req.body.p2;
  const p3 = req.body.p3;
  const p4 = req.body.p4;
  const p5 = req.body.p5;
  const p6 = 'nothing here';
  
  const p7 = req.body.p7;
  const p8 = req.body.p8;
  const p9 = req.body.p9;
  const object = req.body.object;
  const service = new Service({
    userId: req.user,
     p1: p1,
     p2: p2,
     p3: p3,
     p4: p4,
     p5: p5,
     p6: p6,
     p7: p7,
     p8: p8,
     p9: p9,
     object: object
  });
  service
    .save()
    .then(result => {
      console.log('Created Service');
      res.redirect('/admin/services');
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.postCommonCustomization = (req, res, next) => {
//   const p1 = req.body.p1;
//   const p2 = req.body.p2;
//   const p3 = req.body.p3;
//   const p4 = req.body.p4;
//   const p5 = req.body.p5;
//   const p6 = req.body.p6;
//   const p7 = req.body.p7;
//   const p8 = req.body.p8;
//   const p9 = req.body.p9;
//   const object = req.body.object;
//   const service = new Service({
//     userId: req.user,
//      p1: p1,
//      p2: p2,
//      p3: p3,
//      p4: p4,
//      p5: p5,
//      p6: p6,
//      p7: p7,
//      p8: p8,
//      p9: p9,
//      object: object
//   });
//   service
//     .save()
//     .then(result => {
//       console.log('Created Service');
//       res.redirect('/admin/services');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };


exports.getStandardShirtCustomization = (req, res, next) => {
  res.render('services/standard-shirt', {
    pageTitle: 'Standard Shirt Stitching',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getStandardPage = (req, res, next) => {
  res.render('tailor/selector', {
    pageTitle: 'Standard Selector',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getSamplePage = (req, res, next) => {
  res.render('services/sample-form', {
    pageTitle: 'Sample ',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getKurtaCustomization = (req, res, next) => {
  res.render('tailor/common-form2', {
    pageTitle: 'Kurta Stitching',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getPajamaCustomization = (req, res, next) => {
  res.render('tailor/common-form', {
    pageTitle: 'Pajama Stitching',
    path: '/admin/add-product',
    editing: false
  });
};


exports.getBlouseCustomization = (req, res, next) => {
  res.render('services/blouse-form', {
    pageTitle: 'Blouse Stitching',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getGownCustomization = (req, res, next) => {
  res.render('tailor/common-form', {
    pageTitle: 'Gown Stitching',
    path: '/admin/add-product',
    editing: false
  });
};


exports.getKurtiCustomization = (req, res, next) => {
  res.render('tailor/common-form2', {
    pageTitle: 'Kurti Stitching',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getSalwarSuitCustomization = (req, res, next) => {
  res.render('tailor/common-form', {
    pageTitle: 'Salwar-Suit Stitching',
    path: '/admin/add-product',
    editing: false
  });
};
