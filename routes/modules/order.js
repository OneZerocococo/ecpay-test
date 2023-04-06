const express = require('express')
const router = express.Router()
const orderController = require('../../controllers/order-controller')

router.post('payment/payment_result', orderController.getPaymentResult)
// 綠界傳送刷卡結果通知
router.post('/payment/receive_result', orderController.paymentResult)
// 前端post訂單，資料庫產生未付款新訂單
router.get('/payment/:id', orderController.getPayment)
router.post('/receive_result', orderController.getTradeInfo)



module.exports = router