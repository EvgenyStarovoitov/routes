const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cors              = require('cors');
const PORT              = process.env.PORT || 3010;
const crypto            = require('crypto');
const multer            = require('multer');
// const urlencodedParser  = bodyParser.urlencoded({extended: false});

let data = [
  { value: '0', text: 'Том менеджмент' },
  { value: '1', text: 'Служба безопасности' },
  { value: '2', text: 'Юридический отдел' },
  { value: '3', text: 'Финансовый отдел' },
  { value: '4', text: 'Отдел качества' }
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
    link: 'link from server',
    qrCode: 'qrCode from server'
  })
});

app.listen(PORT, ()=> {
  console.log(`server listen on port: ${PORT}`)
});