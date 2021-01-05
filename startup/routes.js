const express = require('express');
const error = require('../middleware/error');
const auth = require('../routes/auth.route');
const users = require('../routes/user.route');
const matching = require('../routes/matching.route');
const image = require('../routes/image.route');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/auth', auth)
  app.use('/api/user', users)
  app.use('/api/match', matching)
  app.use('/api/pic', image)
  app.use(error);
}