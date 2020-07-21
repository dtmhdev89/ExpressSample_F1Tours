const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users
    }
  })
};

exports.getUser = (req, res) => {
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

exports.createUser = (req, res) => {
  const newUserId = users.length + 1;
  const newUser = Object.assign({id: newUserId}, req.body);

  users.push(newUser);

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    })
  });
};

exports.updateUser = (req, res) => {
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

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: updatingUser
      }
    })
  });
};

exports.deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  const deleteUser = users.find(el => el.id === id);
  if (!deleteUser) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainUsers = users.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/../data/users.json`, JSON.stringify(remainUsers), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: null
      }
    })
  });
};
