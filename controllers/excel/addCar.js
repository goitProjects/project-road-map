const { addCarToExcel } = require('../../model/excel');

const addCar = async (req, res) => {
  const car = await addCarToExcel(req.body);
  res.status(201).json(car);
};

module.exports = addCar;
