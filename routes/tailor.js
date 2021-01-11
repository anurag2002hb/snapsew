const path = require('path');

const express = require('express');

const tailorController = require('../controllers/tailor');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// router.get('/', shopController.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/cart', isAuth, shopController.getCart);

// router.post('/cart', isAuth, shopController.postCart);

// router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// router.post('/create-order', isAuth, shopController.postOrder);

// router.get('/orders', isAuth, shopController.getOrders);

// router.get('/home', shopController.getHome);

router.get('/tailor', tailorController.getTailor);

router.get('/tailor-products', tailorController.getTailorProducts);




module.exports = router;
