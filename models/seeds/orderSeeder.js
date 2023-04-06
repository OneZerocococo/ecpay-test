const mongoose = require('mongoose')
const Order = require('../order')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 11; i < 20; i++) {
    Order.create({name:`name-${i}`, amount: 100 + i})
  }
  console.log('seed done')
})