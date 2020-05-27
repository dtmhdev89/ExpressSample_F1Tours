const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/f1tours.json`));

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
  const id = parseInt(req.params.id);

  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }


  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
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
  const id = parseInt(req.params.id);

  const updatingTour = tours.find(el => el.id === id);
  if (!updatingTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
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
  const id = parseInt(req.params.id);

  const deleteTour = tours.find(el => el.id === id);
  if (!deleteTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/../data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};
