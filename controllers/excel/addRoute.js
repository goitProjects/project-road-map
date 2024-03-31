const { addRouteToExcel } = require('../../model/excel');

const addRoute = async (req, res) => {
  const result = await addRouteToExcel(req.body);
  res.status(201).json(result);
};

module.exports = addRoute;
