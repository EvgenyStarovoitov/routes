const express         = require('express');
const app             = express();
const bodyParser      = require('body-parser');
const cors            = require('cors');
const PORT            = process.env.PORT || 3010;

let data = [
  { value: '01', text: 'ИП Фридман М.М.' },
  { value: '02', text: 'ООО «Виктори»' },
  { value: '03', text: 'ФГУП НПП ВНИИЭМ' }
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

app.listen(PORT, ()=> {
  console.log(`server listen on port: ${PORT}`)
});