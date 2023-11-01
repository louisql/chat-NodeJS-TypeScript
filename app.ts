import express from 'express';
import mongoose, { ConnectOptions} from 'mongoose';

const app = express();
const port = 4000;

const mongoURI = "mongodb+srv://louisqueruau:mDF6kBHVnrD2EEH1@cluster0.mgq35co.mongodb.net/?retryWrites=true&w=majority";

// DB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions); // Use a type assertion here

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

//Middleware for parsing JSON data
app.use(express.json());


//Auth routes
import router from './src/routes/auth';
const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
