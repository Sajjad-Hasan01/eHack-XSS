const mongoose = require('mongoose');
require("dotenv").config();

module.exports = function dbConnection() {
        try {
                const connectionParams = {
                        useNewUrlParser: true,
                        useCreateIndex: true,
                        useUnifiedTopology: true
                };
                mongoose.connect(process.env.DB);
                console.log('Connected to database');
        } catch (error) {
                console.log(error);
                console.log(`Couldn't connect to database`);
        }
};
