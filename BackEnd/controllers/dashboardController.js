exports.dashboard = (request, h) => {
  return { message: `Welcome ${request.user.username}! This is your dashboard.` };
};
