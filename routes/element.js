const express = require('express');

const elementController = require('../controllers/element');

const router = express.Router();

router.get('/', elementController.getAllElements);

router.post('/upload', elementController.postAddPasta);

router.post('/upload-video', elementController.postAddVideo);

// router.get('/api', elementController.getProducts);

// router.get('/products/:productId', elementController.getProduct);

// router.get('/cart', elementController.getCart);

// router.post('/cart', elementController.postCart);

// router.post('/cart-delete-item', elementController.postCartDeleteProduct);

// router.get('/orders', elementController.getOrders);

// router.get('/checkout', elementController.getCheckout);

module.exports = router;
