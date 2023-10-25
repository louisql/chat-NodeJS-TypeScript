const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://louisqueruau:mDF6kBHVnrD2EEH1@cluster0.mgq35co.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Database connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

