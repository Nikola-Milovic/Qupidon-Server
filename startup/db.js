const logger = require('../logging/logger')
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost/qupidon', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
      logger.error('Failed to connect to MongoDB...', err)
    }
    else {
      logger.info('Connected to MongoDB...')
    }
  });
}