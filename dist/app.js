import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import mongoose from 'mongoose';
import AppError from './utils/app-error';
import dotenv from 'dotenv';
//Load environment variables (from .env)
dotenv.config();
var app = express();
var port = process.env.PORT;
var mongoURI = process.env.DATABASE_URI;
// DB connection
if (mongoURI) {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }); // Use a type assertion here
}
else {
    throw new AppError('Problem with environment variable', 500);
}
var db = mongoose.connection;
db.on('error', function (error) {
    console.error('Database connection error:');
    throw new AppError('Database connection error', 500);
});
db.once('open', function () {
    console.log('Connected to the database');
});
//Middleware for parsing JSON data
app.use(express.json());
//Auth routes
var authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.use(errorHandler); // ! keep errorhandler as the last middleware after all routes !
app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
