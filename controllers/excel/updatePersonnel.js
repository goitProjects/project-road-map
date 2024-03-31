const { updatePersonInExcel } = require('../../model/excel');

const updatePersonnel = async (req, res) => {
  const name = req.params.name;
  const updatedPerson = await updatePersonInExcel(name, req.body);
  res.json(updatedPerson);
};

module.exports = updatePersonnel;
