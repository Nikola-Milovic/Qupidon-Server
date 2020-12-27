const logger = require('./logging/logger')
const express = require('express');
const app = express();

require('./startup/routes')(app);
// require('./startup/db')();
// require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));