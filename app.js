const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/f1tours.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));

const getAllF1Tours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  })
};

const getAF1Tour = (req, res) => {
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

const createAF1Tour = (req, res) => {
  const newF1Id = tours.length + 1;
  const newF1Tour = Object.assign({id: newF1Id}, req.body);

  tours.push(newF1Tour);

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newF1Tour
      }
    })
  });
};

const updateAF1Tour = (req, res) => {
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

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
};

const deleteAF1Tour = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteTour = tours.find(el => el.id === id);
  if (!deleteTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users
    }
  })
};

const getUser = (req, res) => {
  const id = parseInt(req.params.id);

  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }


  res.status(200).json({
    status: 'success',
    data: {
      user: user
    }
  })
};

const createUser = (req, res) => {
  const newUserId = users.length + 1;
  const newUser = Object.assign({id: newUserId}, req.body);

  users.push(newUser);

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);

  const updatingUser = users.find(el => el.id === id);
  if (!updatingUser) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  Object.assign(updatingUser, req.body);

  tours.map(r => (updatingUser.id == r.id) || r);

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: updatingUser
      }
    })
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteUser = users.find(el => el.id === id);
  if (!deleteUser) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainUsers = users.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(remainUsers), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: null
      }
    })
  });
};

// app.get('/api/f1/tours', getAllF1Tours);
// app.get('/api/f1/tours/:id', getAF1Tour);
// app.post('/api/f1/tours', createAF1Tour);
// app.patch('/api/f1/tours/:id', updateAF1Tour);
// app.delete('/api/f1/tours/:id', deleteAF1Tour);


const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter
  .route('/')
  .get(getAllF1Tours)
  .post(createAF1Tour)

tourRouter
  .route('/:id')
  .get(getAF1Tour)
  .patch(updateAF1Tour)
  .delete(deleteAF1Tour)

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser)

userRouter
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

app.use('/api/f1/tours', tourRouter);
app.use('/api/f1/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`F1Tours running on port ${port} ...`);
});
