const { deleteCarFromExcel } = require('../../model/excel');

const deleteCar = async (req, res) => {
  const { sign } = req.params;
  await deleteCarFromExcel(sign);
  res.status(204).end();
};

module.exports = deleteCar;
