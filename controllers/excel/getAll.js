const { parseInfo } = require('../../model/excel.js');

const getAll = async (req, res) => {
  const data = await parseInfo();
  res.json(data);
};

module.exports = getAll;
