const express = require('express');
const app = express();

const PORT = process.env.PORT || 3010;

let logger = ( req, res, next) => {
  console.log(`req in time: ${new Date()}`);
  next();
}

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, ()=> {
  console.log(`server listen on port: ${PORT}`)
});