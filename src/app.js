const express = require('express');
const routes = require('./routes/index.route');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/AppError.util');

const app = express();

// *** Middleware *** //

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *** Routes *** //
// Health check
app.get('/healthz', (_req, res) => {
    res.status(200).send('OK');
});

// API routes
app.use('/api/v1', routes);

// Catch all unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);
module.exports = app;
