const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI

const options = {
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Connected to Mongoose');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from Mongoose. Reconecting...');
    });

    try {
        await mongoose.connect(uri, options);
        await mongoose.connection.db.admin().command({ ping: 1 }); 
        console.log("Ping send successfully. Connected to MongoDB");
    } catch (error) {
        console.error("Error trying to connect MongoDB:", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;