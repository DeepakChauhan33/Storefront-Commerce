const express = require('express');
const router = express.Router();


const { placeOrder, createOrder, getOrders } = require("../controllers/orderController");


// Middlewares 
const authMiddleware = require('../middleware/authMiddleware');



router.get('/order', placeOrder);


router.post('/createOrder', authMiddleware, createOrder);


router.get('/orders', authMiddleware, getOrders);






module.exports = router;