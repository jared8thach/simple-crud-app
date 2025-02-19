require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const personRoute = require('./routes/person.route.js');

const app = express();

// by default, Express does not allow JSON format in request
// therefore, we must establish a middleware
app.use(express.json());
// another middleware to allow api to accept form requests
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/product', productRoute);
app.use('/api/person', personRoute);

// First, connect to database
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@backenddb.zkb6dyb.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB`)
  .then(() => {
    console.log('Database connected.');

    // Second, connect to Express server  
    app.listen(process.env.EXPRESS_SERVER_PORT, () => {
        console.log(`Server is running on port ${process.env.EXPRESS_SERVER_PORT}.`);
    });
    
})
.catch(() => {
    console.log('Database connection failed.');
});