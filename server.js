const express = require('express')

// declare an app from express
const app = express()

// create a basic index route
app.get('/', (req, res) => {

  res.json({ status: 'Introduction to Nodejs' })
})

// start the server on the assigned port
app.listen(3000, () => {
  console.log('I am listening to port 3000')
})
