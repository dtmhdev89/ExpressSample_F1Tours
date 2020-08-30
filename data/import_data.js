const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const F1Tour = require('./../models/f1TourModel');

dotenv.config({path: './config.env'});

const DB = process.env.MONGODB_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection for importing data successfully!'));

const f1Tours = JSON.parse(fs.readFileSync('./data/f1tours.json', 'utf-8'));

const importData  = async () => {
  try {
    await F1Tour.create(f1Tours);
    console.log('Data imported successfully');
    process.exit();
  } catch(e) {
    console.log(e);
    process.exit();
  }
};

const deleteData = async () => {
  try {
    await F1Tour.deleteMany();
    console.log('Data deleted successfully');
    process.exit();
  } catch(e) {
    console.log(e);
    process.exit();
  }
};

if(process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData()  ;
};
