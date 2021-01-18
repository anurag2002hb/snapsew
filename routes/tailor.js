const path = require('path');

const express = require('express');

const tailorController = require('../controllers/tailor');
const isAuth = require('../middleware/is-auth');

const router = express.Router();


// /tailor/add-product => GET
router.get('/add-service', isAuth, tailorController.getCustomization);

// /tailor/products => GET
router.get('/services', isAuth, tailorController.getServices);

// /tailor/add-product => POST
router.post('/add-service', isAuth, tailorController.postCustomization);

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

router.get('/blouse-form', tailorController.getBlouseForm);

router.get('/shirt-form', tailorController.getShirtForm);

router.get('/checkout', tailorController.getCheckout);

router.get('/tailor-cart', tailorController.getCart);




module.exports = router;
