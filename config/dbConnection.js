const mongoose = require('mongoose');
require('dotenv').config()

const mongoURI = process.env.MONGO_URL


const connectDB = async () => {
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    
    // Handle MongoDB connection events
    db.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    
    db.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    
    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
}

module.exports = connectDB;