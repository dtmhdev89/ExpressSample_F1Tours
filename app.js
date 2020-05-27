const express = require('express');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(express.json());


app.use('/api/f1/tours', tourRouter);
app.use('/api/f1/users', userRouter);

module.exports = app;