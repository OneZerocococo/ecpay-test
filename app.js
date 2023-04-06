if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const routes = require('./routes')
require('./conf/mongoose')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', routes)
app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(4000, () => {
  console.log('App is running on http://localhost:4000')
})