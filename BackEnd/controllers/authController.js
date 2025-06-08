const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const Joi = require('joi');
const { users } = require('../models/users');
const JWT_SECRET = require('../utils/jwtSecret');

exports.register = async (request, h) => {
  const { username, password, name, mobile } = request.payload;

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return h.response({ message: 'User already exists' }).code(400);
  }

  const hashedPassword = await Bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword, name, mobile });

  return h.response({ message: 'User registered successfully' }).code(201);
};

exports.login = async (request, h) => {
  const { username, password } = request.payload;
  const user = users.find(u => u.username === username);

  if (!user || !(await Bcrypt.compare(password, user.password))) {
    return h.response({ status: 'fail', message: 'Invalid username or password' }).code(401);
  }

  const token = Jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  return {
    status: 'success',
    message: 'Login successful',
    token,
  };
};
