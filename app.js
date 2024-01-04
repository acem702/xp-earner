const express = require('express');

const app = express();

app.get('/healthz', (_req, res) => {
    res.status(200).send('OK');
});

module.exports = app;
