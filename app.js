const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://louisqueruau:mDF6kBHVnrD2EEH1@cluster0.mgq35co.mongodb.net/?retryWrites=true&w=majority";

// DB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

//Middleware for parsing JSON data
app.use(express.json());


//Auth routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
