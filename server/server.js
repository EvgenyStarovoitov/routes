const express         = require('express');
const app             = express();

const PORT = process.env.PORT || 3010;

let data = [{"Cur_ID":298,"Date":"2016-07-05T00:00:00","Cur_Abbreviation":"RUB","Cur_Scale":100,"Cur_Name":"Российских рублей","Cur_OfficialRate":3.1318}];

let logger = ( req, res, next) => {
  console.log(`req in time: ${new Date()}`);
  next();
};

app.use(logger);

app.get('/', (req, res) => {
  res.send(data);
});

app.listen(PORT, ()=> {
  console.log(`server listen on port: ${PORT}`)
});