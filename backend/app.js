const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authJwt = require('./helpers/jwt');
app.use(cors());
app.options('*', cors());

const api = process.env.API_URL;
const productRouter = require('./routers/ads');
const deviceRouter = require('./routers/devices');
const accountRouter = require('./routers/accounts');
const storeRouter = require('./routers/stores');

// Middleware
app.use(express.json());
app.use(morgan('tiny')); // Use the 'morgan' middleware
app.use(authJwt());
app.use((err, req, res, next) => {
    if (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Routers
app.use(`${api}/ads`, productRouter);
app.use(`${api}/devices`, deviceRouter);
app.use(`${api}/accounts`, accountRouter);
app.use(`${api}/stores`, storeRouter);

mongoose.connect(process.env.MONGODB_CONNECT)
    .then(() => {
        console.log('Database connection is ready for test...');
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