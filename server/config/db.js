const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error trying to connect MongoDB:", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;