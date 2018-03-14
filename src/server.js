import express  from 'express';
import React    from 'react';
import ReactDOMServer from 'react-dom/server';
import App      from './components/App';
import {StaticRouter} from 'react-router-dom';
// import { renderToString } from 'react-router-server';

const app = express();

app.use((req, res) => {
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

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';

function renderHTML(componentHTML) {
  return `
    <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hello React</title>
          <link rel="stylesheet" href="${assetUrl}/dist/styles.css">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="${assetUrl}/dist/bundle.js"></script>
      </body>
    </html>
  `;
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
