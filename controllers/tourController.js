const fs = require('fs');

const F1Tour =  require('./../models/f1TourModel');

exports.getAllF1Tours = async (req, res) => {
  try {
    const tours = await F1Tour.find();
    
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours
      }
    });
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  };

};

exports.getAF1Tour = async (req, res) => {
  try {
    const tour = await F1Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour: tour
      }
    });
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      message: e
    });
  };
};

exports.createAF1Tour = async (req, res) => {
  try {
    const newF1Tour = await F1Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      messages: e
    })
  };
};

exports.updateAF1Tour = async (req, res) => {
  try {
    const tour = await F1Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      messages: e
    })
  };
};

exports.deleteAF1Tour = async (req, res) => {
  try {
    const tour = await F1Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch(e) {
    res.status(404).json({
      status: 'fail',
      messages: e
    })
  };
};
