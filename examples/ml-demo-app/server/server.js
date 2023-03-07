const config = require('./config'),
      express = require('express')
      helmet = require('helmet'),
      cors = require('cors'),
      morgan = require('morgan'),
      { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware'),
      { handleDocumentsRes, handleSearchRes} = require('./handlers');
const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// ML REST server
const restUrl = "http://" + config.host + ":" + config.rest["rest-api"].port;
const restUser = config.user["user-name"];
const restPass = config.user.password;

app.use('/v1/*', createProxyMiddleware({
  target: restUrl,
  changeOrigin: true,
  auth: restUser + ':' + restPass,
  selfHandleResponse: true,
  // Transform requests if needed
  // onProxyReq(proxyReq, req, res) {
  //   // Example: https://github.com/chimurai/http-proxy-middleware/blob/master/recipes/modify-post.md
  // },
  // Transform responses if needed
  onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    let result = responseBuffer;
    switch (req.path) {
      case '/v1/search':
        result = handleSearchRes(responseBuffer, proxyRes, req, res);
        break;
      case '/v1/documents':
        result = handleDocumentsRes(responseBuffer, proxyRes, req, res);
        break;
    }
    return result;
  }),
}));

app.listen(config.server.port, config.host, () => {
    console.log(`Starting proxy at ${config.host}:${config.server.port}`);
});