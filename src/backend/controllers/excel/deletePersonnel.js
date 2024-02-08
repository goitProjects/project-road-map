const { deletePersonnelFromExcel } = require('../../model/excel');

const deletePersonnel = async (req, res) => {
  const { name } = req.params;
  await deletePersonnelFromExcel(name);
  res.status(204).end();
};

module.exports = deletePersonnel;
