const validateBody = require('../../middlewares/validateBody');
const {
  getAll,
  addCar,
  addPersonnel,
  updateCars,
  updatePersonnel,
  deleteCar,
  addRoute,
  updateRoute,
  deletePersonnel,
  deleteRoute,
} = require('../../controllers/excel');
const express = require('express');
const {
  schemaCar,
  schemaPerson,
  schemaCarUpdate,
  schemaPersonUpdate,
  schemaRoute,
  schemaRouteUpdate,
} = require('../../schema/joiSchema');

const router = express.Router();

router.get('/', getAll);

router.post('/cars', validateBody(schemaCar), addCar);
router.put('/cars/:sign', validateBody(schemaCarUpdate), updateCars);
router.delete('/cars/:sign', deleteCar);

router.post('/personnel', validateBody(schemaPerson), addPersonnel);
router.put(
  '/personnel/:name',
  validateBody(schemaPersonUpdate),
  updatePersonnel
);
router.delete('/personnel/:name', deletePersonnel);

router.post('/routes', validateBody(schemaRoute), addRoute);
router.put('/routes/:id', validateBody(schemaRouteUpdate), updateRoute);
router.delete('/routes/:id', deleteRoute);

module.exports = {
  routerInfos: router,
};
