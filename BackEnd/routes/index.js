const Joi = require('joi');
const dashboardController = require('../controllers/dashboardController');
const detailController = require('../controllers/detailController');
const validateUser = require('../middleware/validateUser');
const authController = require('../controllers/authController');

module.exports = [
  {
    method: 'POST',
    path: '/api/register',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
          name: Joi.string().min(2).required(),
          mobile: Joi.string().min(8).required(),
        }),
      },
      handler: authController.register,
    },
  },
  {
    method: 'POST',
    path: '/api/login',
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
        failAction: (request, h, error) => {
          return h.response({ status: 'fail', message: error.details[0].message }).code(400).takeover();
        },
      },
      handler: authController.login,
    },
  },
  {
    method: 'GET',
    path: '/api/dashboard',
    options: {
      pre: [{ method: validateUser }],
      handler: dashboardController.dashboard,
    },
  },
  {
    method: 'POST',
    path: '/api/fill-details',
    options: {
      pre: [{ method: validateUser }],
      validate: {
        payload: Joi.object({
          fullname: Joi.string().required(),
          dob: Joi.string().required(),
          gender: Joi.string().valid('Male', 'Female').required(),
          weight: Joi.number().required(),
          goal: Joi.string().required(),
          height: Joi.number().required(),
        }),
        failAction: (request, h, error) => {
          return h.response({ status: 'fail', message: error.details[0].message }).code(400).takeover();
        },
      },
      handler: detailController.fillDetails,
    },
  },
  {
    method: 'GET',
    path: '/api/user-details',
    options: {
      pre: [{ method: validateUser }],
      handler: detailController.getDetails,
    },
  },
];
