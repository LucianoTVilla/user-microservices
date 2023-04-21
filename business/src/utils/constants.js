const jwtSecret = process.env.JWT_SECRET;
const username = process.env.MONGO_DB_USERNAME;
const password = process.env.MONGO_DB_PASSWORD;

module.exports = {
  jwtSecret,
  username,
  password,
};