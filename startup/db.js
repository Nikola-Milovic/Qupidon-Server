const logger = require('../logging/logger')
const mongoose = require('mongoose');


//Mongoose will call createIndex for each index sequentially, and emit an 'index' event on the model when 
//all the createIndex calls succeeded or when there was an error.While nice for development, it is recommended this behavior be disabled in production 
//since index creation can cause a significant performance impact.Disable the behavior by setting the autoIndex option of your schema to false, or 
//globally on the connection by setting the option autoIndex to false.
module.exports = function () {
  mongoose.connect('mongodb://localhost/qupidon', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
    if (err) {
      logger.error('Failed to connect to MongoDB...', err)
    }
    else {
      logger.info('Connected to MongoDB...')
    }
  })};