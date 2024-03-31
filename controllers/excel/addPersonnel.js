const { addPersonToExcel } = require('../../model/excel');

const addPersonnel = async (req, res) => {
  const person = await addPersonToExcel(req.body);
  res.status(201).json(person);
};

module.exports = addPersonnel;
