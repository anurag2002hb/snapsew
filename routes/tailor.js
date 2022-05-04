const path = require('path');

const express = require('express');

const tailorController = require('../controllers/tailor');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /tailor/products => GET
router.post('/create-checkout-service', isAuth, tailorController.postChekoutService);


router.get('/checkout', isAuth, tailorController.getCheckout);


router.get('/addres', isAuth, tailorController.getAddres);

router.post('/addres', isAuth, tailorController.postAddres);

router.get('/tailor-cart', isAuth, tailorController.getTailorCart);

router.get('/tailor-orders', isAuth, tailorController.getTailorOrders);

router.get('/check-tailor-orders', isAuth, tailorController.getMyTailorOrders);

router.get('/precheckout', isAuth, tailorController.getPreCheckout);

// //////////////

// router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

// router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-service', isAuth, isAuth, tailorController.postDeleteService);

router.post('/delete-basket-service', isAuth, isAuth, tailorController.postBasketDeleteService);

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

router.get('/', tailorController.getTailor);

router.get('/tailor-basket', isAuth, tailorController.getTailorBasket);

router.get('/tailor-sign-in', tailorController.getTailorSignIn);

router.get('/tailor-sign-up', tailorController.getTailorSignUp);

router.get('/tailor-products', tailorController.getTailorProducts);

// //////////////////////////////various products///////////////////////


//router.post('/add-common-service', isAuth, tailorController.postCommonCustomization);

router.post('/add-shirt-service', isAuth, tailorController.postShirtCustomization);

router.post('/add-blouse-service', isAuth, tailorController.postBlouseCustomization);

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
