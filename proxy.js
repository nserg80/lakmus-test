const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/Dictionaries', createProxyMiddleware({
    target: 'https://global.lakmus.org',
    changeOrigin: true,
    pathRewrite: { '^/Dictionaries': '/Dictionaries' },
}));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
