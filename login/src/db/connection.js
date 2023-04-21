const mongoose = require('mongoose');
const { username, password } = require('../utils/constants');

const uri = process.env.MONGODB_URI || `mongodb+srv://${username}:${password}@cluster0.y4zbd0n.mongodb.net/conexa?retryWrites=true&w=majority`;

module.exports = () => mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

