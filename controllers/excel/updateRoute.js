const { updateRouteInExcel } = require('../../model/excel');

const updateRoute = async (req, res) => {
  const { id } = req.params;
  const result = await updateRouteInExcel(id, req.body);
  res.json(result);
};

module.exports = updateRoute;
