const express = require('express');
const { resolve } = require('path');
const connectDB = require('./src/db')
const router = require('./src/Route');
require('dotenv').config({
  path:'./src/.env'
})

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(express.json());
app.use('/api',router)

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});
const url = process.env.db_url

app.listen(port, async() => {
  await connectDB(url)
  console.log(`Example app listening at http://localhost:${port}`);
  
});
