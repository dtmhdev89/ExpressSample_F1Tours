const express = require('express');
const morgan = require('morgan');

const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());
console.log('==========================');
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(`${__dirname}/public`));
}


app.use('/api/f1/tours', tourRouter);
app.use('/api/f1/users', userRouter);

module.exports = app;