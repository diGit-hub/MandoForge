const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Error trying to connect MongoDB:", error.message);
        throw error;
    }
}
module.exports = connectDB;