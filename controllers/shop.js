const Product = require('../models/product');
const Order = require('../models/order');
const Service = require('../models/service');

// 'userId': req.user._id

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getService = (req, res, next) => {
  const servId = req.params.serviceId;
  Service.findById(servId)
    .then(service => {
      res.render('shop/service-detail', {
        service: service,
        pageTitle: service,
        path: '/services'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getBasket = (req, res, next) => {
  req.user
    .populate('basket.things.serviceId')
    .execPopulate()
    .then(user => {
      const services = user.basket.things;
      res.render('shop/basket', {
        path: '/basket',
        pageTitle: 'Your Basket',
        services: services
      });
    })
    .catch(err => console.log(err));
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



exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};


exports.postBasket = (req, res, next) => {
  const servId = req.body.serviceId;
  Service.findById(servId)
    .then(service => {
      return req.user.addToBasket(service);
    })
    .then(result => {
      console.log(result);
      res.redirect('/tailor-cart');
    });
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

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err));
};


exports.postTailorOrder = (req, res, next) => {
  req.user
    .populate('basket.things.serviceId')
    .execPopulate()
    .then(user => {
      const services = user.basket.things.map(i => {
        return { service: { ...i.serviceId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        services: services
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearBasket();
    })
    .then(() => {
      res.redirect('/checkout');
    })
    .catch(err => console.log(err));
};

