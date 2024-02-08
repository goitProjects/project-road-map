const { ctrlWrapper } = require('../../services');
const getAll = require('./getAll');
const addCar = require('./addCar');
const addPersonnel = require('./addPersonnel');
const updateCars = require('./updateCars');
const updatePersonnel = require('./updatePersonnel');
const deleteCar = require('./deleteCar');
const addRoute = require('./addRoute');
const updateRoute = require('./updateRoute');
const deletePersonnel = require('./deletePersonnel');
const deleteRoute = require('./deleteRoute');
const generateMainList = require('./generateMainList');

module.exports = {
  getAll: ctrlWrapper(getAll),
  addCar: ctrlWrapper(addCar),
  addPersonnel: ctrlWrapper(addPersonnel),
  updateCars: ctrlWrapper(updateCars),
  updatePersonnel: ctrlWrapper(updatePersonnel),
  deleteCar: ctrlWrapper(deleteCar),
  addRoute: ctrlWrapper(addRoute),
  updateRoute: ctrlWrapper(updateRoute),
  deletePersonnel: ctrlWrapper(deletePersonnel),
  deleteRoute: ctrlWrapper(deleteRoute),
  generateMainList: ctrlWrapper(generateMainList),
};
