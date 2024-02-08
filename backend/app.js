const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const productRouter = require('./routers/ads');

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/ads`, productRouter);

mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log('Database connection is ready...');
    })
    .catch((err) => {
        console.log(err);
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(api);
    console.log(`Server listening on port ${PORT}`);
});

// app.use(express.static('public'));