//destructuring and requiring mongoose to work with mongoDB
const {connect, connection} = require('mongoose');

//creating the database connection string name
const connectionString =
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_db';

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
