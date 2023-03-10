const Product = require('../models/product');
const Service = require('../models/service');
const user = require('../models/user');
const Order = require('../models/order');

exports.getAdminOrders = (req, res, next) => {
  Order.find()
    .then(orders => {
      // console.log(orders);
      res.render('admin/orders', {
        pageTitle: 'Admin Orders',
        path: '/admin/add-orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.getUsers = (req, res, next) => {
  user.find()
    .then(users => {
      console.log(users);
      res.render('admin/users', {
        pageTitle: 'Users',
        path: '/admin/users',
        users: users
      });
    })
    .catch(err => console.log(err));
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save().then(result => {
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    // .select('title price -_id')
    // .populate('userId', 'name')
    .then(products => {
      console.log(products);
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};


exports.postAddress = (req, res, next) => {
  const pin = req.body.pin;
  const title = req.body.title;
  user.find({ userId: req.user._id })
    .then(user => {
        console.log(user);
    })
};

exports.getAddress = (req, res, next) => {
  console.log('aur btao');
  user.find({ userId: req.user._id })
    .then(user => {
        console.log(user);
    })

    user.updateOne(
      {userId: req.user._id }, 
      { age: -1 }, 
      { runValidators: true }
      )
};


exports.getAdminServices = (req, res, next) => {
  console.log(req.user.address);
  Service.find({ userId: req.user._id })
    .then(services => {
      
      res.render('tailor/precheckout', {
        servs: services,
        pageTitle: 'Admin Services',
        path: '/admin/services',
        banner: 'Pre-Checkout'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

