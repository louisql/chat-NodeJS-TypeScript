import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import mongoose, { ConnectOptions} from 'mongoose';
import AppError from './utils/app-error.js';
import dotenv from 'dotenv';
//Load environment variables (from .env)
dotenv.config();

const app = express();
const port = process.env.PORT;

const mongoURI = process.env.DATABASE_URI;

// DB connection
if (mongoURI){
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions); // Use a type assertion here
} else {
  throw new AppError('Problem with environment variable', 500)
}

const db = mongoose.connection;

db.on('error', (error) =>{
  console.error('Database connection error:');
  throw new AppError('Database connection error', 500)
}); 
db.once('open', () => {
  console.log('Connected to the database');
});

//Middleware for parsing JSON data
app.use(express.json());


//Auth routes
import authRoutes from './routes/auth.js'
app.use('/auth', authRoutes);

app.use(errorHandler) // ! keep errorhandler as the last middleware after all routes !

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
