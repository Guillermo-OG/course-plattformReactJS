const express = require("express");

const elementController = require("../controllers/element");

const router = express.Router();

router.post("/upload", elementController.postAddPasta);

router.get("/folders", elementController.getElementfolders);

router.get("/folder/:idPai", elementController.getAllElements);

router.post("/upload-arquivo", elementController.postAddArquivo);

router.get("/video/:userId/:guidVideo", elementController.getSingleVideo);

router.post("/video/salvaHistorico", elementController.salvaHistorico);

// router.get('/api', elementController.getProducts);

// router.get('/products/:productId', elementController.getProduct);

// router.get('/cart', elementController.getCart);

// router.post('/cart', elementController.postCart);

// router.post('/cart-delete-item', elementController.postCartDeleteProduct);

// router.get('/orders', elementController.getOrders);

// router.get('/checkout', elementController.getCheckout);

module.exports = router;
