const express = require('express'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  cors = require('cors');
require('dotenv').config();

const app = express();

const { routerExcel } = require('./routes/api/excel');
const { routerInfos } = require('./routes/api/infos');

const formatLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatLogger));
app.use(cors());
app.use(bodyParser.json());

app.use('/api/infos', routerInfos);
app.use('/api/excel', routerExcel);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
