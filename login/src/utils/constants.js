const jwtSecret = process.env.JWT_SECRET;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

module.exports = {
  jwtSecret,
  username,
  password,
};