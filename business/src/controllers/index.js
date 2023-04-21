const User = require('../models/User');

const getUsers = async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    res.status(401).send({
      message: 'Token is required',
    });
  }

  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({
      message: 'Error getting users',
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
};