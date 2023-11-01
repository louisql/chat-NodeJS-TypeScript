"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 4000;
const mongoURI = "mongodb+srv://louisqueruau:mDF6kBHVnrD2EEH1@cluster0.mgq35co.mongodb.net/?retryWrites=true&w=majority";
// DB connection
mongoose_1.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); // Use a type assertion here
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});
//Middleware for parsing JSON data
app.use(express_1.default.json());
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
