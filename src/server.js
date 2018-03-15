import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import favicon from'serve-favicon';
import morgan from 'morgan';
import serveStatic from 'serve-static';
import flash from 'connect-flash';
import React    from 'react';
import ReactDOMServer from 'react-dom/server';
import App      from './components/App';
import { StaticRouter } from 'react-router-dom';

const staticFolder = 'dist';
const app = express();
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use(flash())
  .use(morgan('combined'))
  .use(favicon(path.join(staticFolder, 'favicon.png')))
  .use(serveStatic(staticFolder))
  .use(compression());

app.get('/', (req, res) => {
  let context = {}
  const componentHTML = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}>
        <App />
    </StaticRouter>
  );

  return res.end(renderHTML(componentHTML));
});

function searchBundle(folder) {
  let bundle = {};
  var files=fs.readdirSync(folder);
  for(let i=0;i<files.length;i++){
    if(files[i].indexOf('.js')>=0) {
      bundle.js = files[i];
    }
    if(files[i].indexOf('.css')>=0) {
      bundle.css = files[i];
    }
  }
  return bundle;
}

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Feedback Servolux</title>
          <link rel="stylesheet" href="/${searchBundle(staticFolder).css}">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/${searchBundle(staticFolder).js}"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
