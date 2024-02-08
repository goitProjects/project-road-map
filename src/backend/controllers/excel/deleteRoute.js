const { deleteRouteFromExcel } = require('../../model/excel');

const deleteRoute = async (req, res) => {
  const { id } = req.params;
  await deleteRouteFromExcel(id);
  res.status(204).end();
};

module.exports = deleteRoute;
