"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./src/middleware/errorHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const app_error_1 = __importDefault(require("./src/utils/app-error"));
const dotenv = require("dotenv");
//Load environment variables (from .env)
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const mongoURI = process.env.DATABASE_URI;
// DB connection
if (mongoURI) {
    mongoose_1.default.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }); // Use a type assertion here
}
else {
    throw new app_error_1.default('Problem with environment variable', 500);
}
const db = mongoose_1.default.connection;
db.on('error', (error) => {
    console.error('Database connection error:');
    throw new app_error_1.default('Database connection error', 500);
});
db.once('open', () => {
    console.log('Connected to the database');
});
//Middleware for parsing JSON data
app.use(express_1.default.json());
//Auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.use(errorHandler_1.errorHandler); // ! keep errorhandler as the last middleware after all routes !
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
