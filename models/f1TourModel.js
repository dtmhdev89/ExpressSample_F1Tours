const mongoose = require('mongoose');

const f1TourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A F1Tour must have a name'],
    unique:true
  },
  first_grand_prix: {
    type: Number
  },
  circuit_length: {
    type: Number
  },
  unit: {
    type: String,
    default:"km",
    trim: true
  },
  number_of_laps: {
    type: Number
  },
  race_distance: {
    type: Number
  },
  lap_record: {
    type: String,
    trim: true
  },
  lap_record_by: {
    type: String,
    trim: true
  },
  lap_record_year: {
    type: Number
  }
});

module.exports = mongoose.model('F1Tour', f1TourSchema);