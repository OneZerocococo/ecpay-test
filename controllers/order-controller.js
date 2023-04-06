const ecpay_payment = require('ecpay_aio_nodejs')
const APIHelper = require('ecpay_aio_nodejs/lib/ecpay_payment/helper')
const options = require('../conf/ecpay_config')
const host_name = 'https://ws.datavansolutions.com:1880/'

const orderController = {
    // 成立訂單

    // 查訂單付款資訊
    getOrderdata: async (req, res, next) => {
        try { /* empty */ } catch (err) {
            next(err)
        }
        // const orderId = req.params.id
    },
    // 取得付款頁面
    getPayment: async (req, res, next) => {
        try { /* empty */ } catch (err) {
            next(err)
        }
        // 取得購物車資訊
        const { TotalAmount, ItemName } = req.body
        // 資料庫內新增訂單

        // 創建(不重複)特店訂單編號20碼
        function createUid() {
            const randomValue = function (min, max) {
                return Math.round(Math.random() * (max - min) + min);
            }
            let uid = "P0" + "1234567890234188" + randomValue(10, 99)
            return uid
        }
        const orderId = createUid()
        let base_param = {
            MerchantTradeNo: orderId, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
            MerchantTradeDate: '2017/02/13 15:45:30', //ex: 2017/02/13 15:45:30
            TotalAmount: TotalAmount,
            TradeDesc: `商店訂購商品，訂單編號：${orderId}`,
            ItemName: ItemName,
            ReturnURL: host_name + 'orders/payment/receive_result', // 為特店server或主機的URL，用來接收綠界後端回傳的付款結果通知。ReturnURL收到綠界後端回傳的付款結果通知後，請回應字串1|OK給綠界。
            ChoosePayment: 'Credit',
            // OrderResultURL: 'https://ws.datavansolutions.com:1880/payment/payment_result', // 在使用者在付款結束後，將使用者的瀏覽器畫面導向該URL所指定的頁面，像是店家網站的訂單付款成功頁面。
            // NeedExtraPaidInfo: '1',
            // ClientBackURL: 'https://www.google.com',
            // ItemURL: 'http://item.test.tw',
            // Remark: '交易備註',
            // HoldTradeAMT: '1',
            // StoreID: '',
            // CustomField1: '',
            // CustomField2: '',
            // CustomField3: '',
            // CustomField4: ''
        }
        const create = new ecpay_payment(options)
        const html = create.payment_client.aio_check_out_all(base_param)
        res.send(html)
    },
    getTradeInfo: async (req, res, next) => {
        try { /* empty */ } catch(err) {
            next(err)
        }
        const { orderId } = req.body
        let base_param = {
            MerchantTradeNo: orderId, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
          }
        const query = new ecpay_payment(options)
        const ecpay_res = await query.query_client.query_trade_info(base_param)
        res.status(200).send(ecpay_res)
          },
         // 刷卡結果通知
    paymentResult: async (req, res, next) => {
        try {
            const results = req.body
            const helper = new APIHelper()
            const chkMacVal = helper.gen_chk_mac_value(results)
            if (req.body.RtnCode === 1 && chkMacVal === req.body.CheckMacValue) {
                // 交易成功，更新訂單付款狀態"已付款"
                res.send('1|OK')
            }
        } catch(err) {
            next(err)
        }
    },
    getPaymentResult: async (req, res, next) => {
        try {
            res.status(200).json(`已支付成功`)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = orderController