const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/f1tours.json`));

exports.checkId = (req, res, next, val) => {
  const id = parseInt(req.params.id);

  const tour = tours.find(el => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  res.locals.tour = tour;

  next();
};

exports.getAllF1Tours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
};

exports.getAF1Tour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: res.locals.tour
    }
  })
};

exports.createAF1Tour = (req, res) => {
  const newF1Id = tours.length + 1;
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
};

exports.updateAF1Tour = (req, res) => {
  const updatingTour = res.locals.tour;
  Object.assign(updatingTour, req.body);

  tours.map(r => (updatingTour.id == r.id) || r);

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
};

exports.deleteAF1Tour = (req, res) => {
  const deleteTour = res.locals.tour;
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== deleteTour.id;})

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};

exports.mwCheckBodyParams = (req, res, next) => {
  const requiredFields = ["name", "unit", "race_distance", "number_of_laps", "circuit_length"];
  var bodyParams = req.body;
  var missingParams = [];
  
  requiredFields.forEach(field => {
    if(!bodyParams[field]) missingParams.push(field);
  })
  
  if(missingParams.length > 0) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required params: " + missingParams.join(', ')
    })
  }  

  next();
};
