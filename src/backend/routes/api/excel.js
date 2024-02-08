const express = require('express');

const router = express.Router();

const { generateMainList } = require('../../controllers/excel');

router.post('/main', generateMainList);

module.exports = {
  routerExcel: router,
};
