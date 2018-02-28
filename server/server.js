const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cors              = require('cors');
const crypto            = require('crypto');
const multer            = require('multer');
const config            = require('../config.json');
const PORT              = process.env.PORT || 3010;
// const urlencodedParser  = bodyParser.urlencoded({extended: false});

let getKeyRandom = (size) => {
  return crypto.randomBytes(size).toString('hex');
};

let data = [
  {"id":1,"name":"Служба безопасности"},
  {"id":2,"name":"Закупки"},
  {"id":3,"name":"Кадры"}
];  
let logger = ( req, res, next) => {
  console.log(`req in time: ${new Date()}`);
  next();
};

app.use(bodyParser.json());
app.use(logger);
app.use(cors());

app.get('/', (req, res) => {
  res.json(data);
});

app.post('/add', (req, res) => {
  console.log(req.body);
  res.json({ 
    link: 'https://servolux.com/'
  })
});

app.listen(PORT, ()=> {
  console.log(`server listen on port: ${PORT}`)
});