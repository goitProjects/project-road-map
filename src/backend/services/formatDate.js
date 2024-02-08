const moment = require('moment');

const formatDate = invalidDate => {
  let date = moment(invalidDate);
  return date.format('HH:mm DD.MM.YYYY');
};

module.exports = formatDate;
