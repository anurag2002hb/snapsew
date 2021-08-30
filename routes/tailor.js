const path = require('path');

const express = require('express');

const tailorController = require('../controllers/tailor');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /tailor/products => GET
router.post('/create-checkout-service', isAuth, tailorController.postChekoutService);


router.get('/checkout', tailorController.getCheckout);


router.get('/addres', tailorController.getAddres);

router.post('/addres', tailorController.postAddres);

router.get('/tailor-cart', tailorController.getTailorCart);

router.get('/tailor-orders', tailorController.getTailorOrders);

router.get('/precheckout', tailorController.getPreCheckout);

// //////////////

// router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-service', isAuth, tailorController.postDeleteService);

// //////////////

// router.post('/checkout', tailorController.postCheckout);


// router.get('/products', shopController.getProducts);

// router.get('/products/:productId', shopController.getProduct);

// router.get('/tailor-cart', isAuth, shopController.getCart);

// router.post('/cart', isAuth, shopController.postCart);

// router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

// router.post('/create-order', isAuth, shopController.postOrder);

// router.get('/orders', isAuth, shopController.getOrders);

// router.get('/home', shopController.getHome);

router.get('/tailor', tailorController.getTailor);

router.get('/tailor-basket', tailorController.getTailorBasket);

router.get('/tailor-sign-in', tailorController.getTailorSignIn);

router.get('/tailor-products', tailorController.getTailorProducts);

// //////////////////////////////various products///////////////////////


router.post('/add-common-service', isAuth, tailorController.postCommonCustomization);

// men

router.get('/add-shirt-service', isAuth, tailorController.getShirtCustomization);

router.get('/add-pant-service', isAuth, tailorController.getPantCustomization);

router.get('/add-kurta-service', isAuth, tailorController.getKurtaCustomization);

router.get('/add-pajama-service', isAuth, tailorController.getPajamaCustomization);

// women

router.get('/add-blouse-service', isAuth, tailorController.getBlouseCustomization);

router.get('/add-gown-service', isAuth, tailorController.getGownCustomization);

router.get('/add-kurti-service', isAuth, tailorController.getKurtiCustomization);

router.get('/add-salwar-suit-service', isAuth, tailorController.getSalwarSuitCustomization);




module.exports = router;
