const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV, PORT, DATABASE } = process.env;

module.exports = {
    nodeEnv: NODE_ENV,
    port: PORT,
    database: DATABASE,
};
