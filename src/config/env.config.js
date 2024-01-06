const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV, PORT, DATABASE, JWT_SECRET } = process.env;

module.exports = {
    nodeEnv: NODE_ENV,
    port: PORT,
    database: DATABASE,
    jwtSecret: JWT_SECRET,
};
