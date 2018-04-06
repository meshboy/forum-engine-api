/**
 *created by Meshileya Seun <meshileyaseun@gmail.com/> 4/6/18
 **/
const express = require('express')

const app = express()

app.get('/', (req, res) => {

  res.json({ status: 'Introduction to Nodejs' })
})

app.listen(3000, () => {
  console.log('I am listening to port 3000')
})
