const path = require('path');
const { fillTable } = require('../../model/fillTable');

const generateMainList = async (req, res) => {
  await fillTable(req.body);

  res.download(
    path.resolve(__dirname, '../../fileStorage/excel/roadXS.xlsx'),
    `roadListExcel.xlsx`,
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
};

module.exports = generateMainList;
