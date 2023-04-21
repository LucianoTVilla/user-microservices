const User = require('../models/User');

const getUsers = async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    res.status(401).send({
      message: 'Token is required',
    });
  }

  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    search = search ? search.toLowerCase() : '';
    const skip = (page - 1) * limit;
    const query = {
      email: { $regex: new RegExp(search, 'i') },
    };
    const count = await User.countDocuments(query);
    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .select('_id email')

    res.status(200).send({
      page,
      limit,
      total: count,
      users,
    });
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