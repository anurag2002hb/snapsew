const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/orders', isAuth, adminController.getAdminOrders);

router.get('/users', isAuth, adminController.getUsers);

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/add-address', isAuth, adminController.getAddress);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/services => GET
router.get('/services', isAuth, adminController.getAdminServices);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;
