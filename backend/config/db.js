const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

// Define the connection function
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected for 'Todo' App: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};
module.exports = connectDB;