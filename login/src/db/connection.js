const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || `mongodb+srv://luchotomasvilla:test123@cluster0.y4zbd0n.mongodb.net/conexa?retryWrites=true&w=majority`;

module.exports = () => mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

