require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js')
const cors = require('cors');

// express app
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api/journals', routes);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// For routing
app.use('/api/journals', routes);

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => {
            console.log('listening to port 4000');
        });
    })
    .catch((error) => {
        console.log(error)
    })