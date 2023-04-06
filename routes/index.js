const express = require('express')
const router = express.Router()
const order = require('./modules/order')

router.use('/orders', order)

module.exports = router