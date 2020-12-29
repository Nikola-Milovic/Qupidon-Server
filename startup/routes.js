const express = require('express');
const error = require('../middleware/error');
const auth = require('../routes/auth.route')
const users = require('../routes/user.route')

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/auth', auth)
  app.use('/api/user', users)
  app.use(error);
}