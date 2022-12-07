const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 5000;
// const connectionString = 'mongodb://127.0.0.1:27017/tekno-ek';
const connectionString = process.env.MONGODB_CONNECTION_STRING;
const bodyParser = require('body-parser');
const cors = require('cors');

// Middlewares
const authentication = require('./middlewares/authentication');

// Routes
const AccountRouter = require('./routes/AccountRouter');
const NewsRouter = require('./routes/NewsRouter');
const CategoryRouter = require('./routes/CategoryRouter');


app.use(cors())
app.use(bodyParser.json());  // bodyParser for Form


app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Welcome to Tekno Ek'
    });
});


// Call routes
app.use('/api/auth', AccountRouter);
// User authentication
app.use(authentication)
app.use('/api', NewsRouter);
app.use('/api', CategoryRouter);



// If route not found
app.use('*', (req, res) => {
    res.json({
        status: 404,
        message: 'Not Found',
    });
});


// Connect to MongoDB
mongoose.connect(connectionString).then(async result => {
    app.listen(port);
    console.log(`Listening on http://localhost:${port} with mongoose`);
});