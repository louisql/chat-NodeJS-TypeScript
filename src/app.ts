import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import mongoose, { ConnectOptions} from 'mongoose';
import AppError from './utils/app-error.js';
import dotenv from 'dotenv';
//Load environment variables (from .env)
import cors from 'cors';

dotenv.config({path: "./.env"});

const app = express();
const port = process.env.PORT || 4000;
console.log("process.env.PORT", process.env.JWT_SECRET)

//Middleware
app.use(cors());
app.use(express.json()); //parsin JSON data

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



app.get('/', (req, res) => {
  res.send('In Express API')
})

//Auth routes
import authRoutes from './routes/auth.js'
app.use('/auth', authRoutes);

app.use(errorHandler) // ! keep errorhandler as the last middleware after all routes !



const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle termination signals
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing server gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});