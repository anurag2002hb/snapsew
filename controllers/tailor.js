const Product = require('../models/product');
const Order = require('../models/order');

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