require('dotenv').config();

const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {

    try {

        mongoose.set('strictQuery', true);
        await mongoose.connect(mongoURI);
        
        console.log('MongoDB is connected');

    } catch (error) {
        
        console.log(error);
        process.exit(1);

    }
    
}

module.exports = connectDB;
