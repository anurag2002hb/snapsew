const Product = require('../models/product');
const Service = require('../models/service');
const Order = require('../models/order');
const User = require('../models/user');


exports.postChekoutService = (req, res, next) => {
  const pin = req.body.pin;
  const title = req.body.title;

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
        pincode: pin,
        add: title,
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearBasket();
    })
    .then(() => {
      res.redirect('/tailor-orders');
    })
    .catch(err => console.log(err));
};

exports.getPreCheckout = (req, res, next) => {
  console.log(req.user);
  res.render('tailor/precheckout', {
        pageTitle: 'Pre Checkout',
        path: '/products'
      })
};

exports.getAddres = (req, res, next) => {
  console.log(req.user.address.pincode);
  res.render('tailor/addres', {
        pageTitle: 'addres',
        path: '/products'
      })
};

exports.postAddres = (req, res, next) => {
  // console.log(req.user.cart);
  const userId = req.user._id
// //////////////////////////////////
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


exports.getTailorOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('tailor/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('tailor/checko', {
        pageTitle: 'Checko',
        path: '/products'
      })
};

exports.getTailorCart = (req, res, next) => {
  req.user
  .populate('basket.things.serviceId')
  .execPopulate()
  .then(user => {
    const services = user.basket.things;
    res.render('tailor/cart', {
      path: '/basket',
      pageTitle: 'Your Basket',
      services: services
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
        path: '/products'
      })
};

exports.getTailorProducts = (req, res, next) => {
  res.render('tailor/tailor-products', {
        pageTitle: 'All Products',
        path: '/products'
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



exports.getTailorSignIn = (req, res, next) => {
  res.render('tailor/signin', {
        pageTitle: 'Sign',
        path: '/products'
      })
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
};


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
  res.render('tailor/common-form', {
    pageTitle: 'Common Customization',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postCommonCustomization = (req, res, next) => {
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
  res.render('tailor/common-form2', {
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

