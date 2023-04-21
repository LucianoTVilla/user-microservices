const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const { jwtSecret } = require('../utils/constants');

const getUsersService = require('../services');

const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ 
      message: 'Email and password are required',
     });
  }

  if (!emailValidator.validate(email)) {
    res.status(400).send({
      message: 'Invalid email',
    });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).send({ 
        message: 'User already exists',
       });
    }

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) return reject(err);
          resolve(hash);
        });
      });
    });

    await User.create({ email, password: hashedPassword });

    res.status(201).send({ 
      message: 'User created successfully',
     });
  } catch (error) {
    res.status(500).send({ 
      message: 'Error creating user',
      error: error.message,
     });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: 'Email and password are required',
    });
  }

  if (!emailValidator.validate(email)) {
    res.status(400).send({
      message: 'Invalid email',
    });
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      res.status(401).send({
        message: 'User does not exist',
      });
    }

    const passwordIsValid = await new Promise((resolve, reject) => {
      bcrypt.compare(password, userExists.password, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (!passwordIsValid) {
      res.status(401).send({
        message: 'Invalid password',
      });
    }

    const token = await jwt.sign({ id: userExists._id }, jwtSecret, {
      expiresIn: 86400, // expires in 24 hours
    });

    res.status(200).send({
      message: 'Login successful',
      token: `Bearer ${token}`,
    });

  } catch (error) {
    res.status(500).send({
      message: 'Error logging in',
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).send({
      message: 'Token is required',
    });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp <= currentTimestamp) {
      return res.status(401).json({ message: 'Token has expired' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const users = await getUsersService(token)
    res.status(200).send(users);
  }
  catch (error) {
    res.status(500).send({
      message: 'Error getting users',
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getUsers,
};