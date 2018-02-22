const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');
const cors              = require('cors');
const PORT              = process.env.PORT || 3010;
// const urlencodedParser  = bodyParser.urlencoded({extended: false});

let data = [
  { value: '1', text: 'Том менеджмент' },
  { value: '2', text: 'Служба безопасности' },
  { value: '3', text: 'Юридический отдел' },
  { value: '4', text: 'Финансовый отдел' },
  { value: '5', text: 'Отдел качества' }
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
  res.json({ text: 'request is successfully'})
});

app.listen(PORT, ()=> {
  console.log(`server listen on port: ${PORT}`)
});