const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://lokesh:lokcode18@cluster0.2lesf.mongodb.net/coldcode?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB_URL)
  .then(() => {
    console.log('MongoDB is Connected...');
  })
  .catch(err => {
    console.log('Error while mongoDB connection: ', err);
  });