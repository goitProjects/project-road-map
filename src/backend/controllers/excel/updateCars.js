const { updateCarInExcel } = require('../../model/excel');

const updateCars = async (req, res) => {
  const sign = req.params.sign;
  const updatedCar = await updateCarInExcel(sign, req.body);
  res.json(updatedCar);
};

module.exports = updateCars;
