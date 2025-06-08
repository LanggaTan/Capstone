const Jwt = require('jsonwebtoken');
const JWT_SECRET = require('../utils/jwtSecret');

const validateUser = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return h.response({ status: 'fail', message: 'Missing authorization header' }).code(401).takeover();
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = Jwt.verify(token, JWT_SECRET);
    request.user = decoded;
    return h.continue;
  } catch (err) {
    return h.response({ status: 'fail', message: 'Invalid token' }).code(401).takeover();
  }
};

module.exports = validateUser;
