const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/index.route');
const globalErrorHandler = require('./controllers/error.controller');
const AppError = require('./utils/AppError.util');
const config = require('./config/env.config');

const app = express();

// *** Middleware *** //

// Enable CORS
app.use(cors({ origin: true, credentials: true }));

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serving static files
app.use(express.static(`${process.cwd()}/public`));

// Development logging
if (config.nodeEnv === 'development') {
    app.use(morgan('dev'));
}

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
