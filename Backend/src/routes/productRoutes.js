
const express = require('express');
const router = express.Router();


const { getProductForm, getProducts, productRegister, getProductById } = require('../controllers/productController');


router.get('/addProduct', getProductForm);

router.post('/addProduct', productRegister);

router.get('/products', getProducts);

router.get('/product/:id', getProductById)



module.exports = router;

