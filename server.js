const mongoose= require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const app = require('./app');

const DB = process.env.MONGODB_LOCAL;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log('connect to db successfully');
}).catch(err => {
  console.log('=== HANDLE ERROR on initial CONNECTION: ', err);
});

mongoose.connection.on('error', err => {
  console.log('=== HANDLE ERROR after initial CONNECTION established: ',  err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
