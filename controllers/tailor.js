const Product = require('../models/product');
const Service = require('../models/service');
const Order = require('../models/order');


exports.getServices = (req, res, next) => {
  // Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    // .then(products => {
    //   console.log(products);
    //   res.render('admin/products', {
    //     prods: products,
    //     pageTitle: 'Admin Products',
    //     path: '/admin/products'
    //   });
    // })
    // .catch(err => console.log(err));
    res.render('tailor/check', {
      pageTitle: 'All Products',
      path: '/products'
    })
};

exports.getCustomization = (req, res, next) => {
  res.render('tailor/shirt-form', {
    pageTitle: 'Customization',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postCustomization = (req, res, next) => {
  const collar = req.body.collar;
  const frontLook = req.body.frontLook;
  const backLook = req.body.backLook;
  const placket = req.body.placket;
  const cuff = req.body.cuff;
  const pocket = req.body.pocket;
  const addDate = req.body.addDate;
  const plan = req.body.plan;
  const extraMessage = req.body.extraMessage;
  const service = new Service({
    collar: collar,
    frontLook: frontLook,
    backLook: backLook,
    placket: placket,
    cuff: cuff,
    pocket: pocket,
    addDate: addDate,
    plan: plan,
    extraMessage: extraMessage,
    userId: req.user
  });
  service
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Service');
      res.redirect('/checkout');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getTailor = (req, res, next) => {
  res.render('tailor/check', {
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

exports.getBlouseForm = (req, res, next) => {
  res.render('tailor/blouse-form', {
        pageTitle: 'Blouse Form',
        path: '/products'
      })
};

exports.getShirtForm = (req, res, next) => {
  res.render('tailor/shirt-form', {
        pageTitle: 'Shirt Form',
        path: '/products'
      })
};

exports.getPantForm = (req, res, next) => {
  res.render('tailor/pant-form', {
        pageTitle: 'Pant Form',
        path: '/products'
      })
};

exports.getCheckout = (req, res, next) => {
  res.render('tailor/checkout', {
        pageTitle: 'Checkout',
        path: '/products'
      })
};

exports.getCart = (req, res, next) => {
  res.render('tailor/cart', {
        pageTitle: 'Cart',
        path: '/products'
      })
};