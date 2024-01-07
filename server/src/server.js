const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config/env.config');

const DB = config.database;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('DB connection successful!');
    });

const port = config.port || 4000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
