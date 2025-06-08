const Joi = require('joi');
const { userDetails } = require('../models/users');

exports.fillDetails = (request, h) => {
  const { username } = request.user;
  const { fullname, dob, gender, weight, goal, height } = request.payload;

  userDetails[username] = { fullname, dob, gender, weight, goal, height };

  return h.response({ status: 'success', message: 'Details saved successfully' }).code(201);
};

exports.getDetails = (request, h) => {
  const { username } = request.user;
  const detail = userDetails[username];

  if (!detail) {
    return h.response({ status: 'fail', message: 'Detail not found' }).code(404);
  }

  return { status: 'success', data: detail };
};
