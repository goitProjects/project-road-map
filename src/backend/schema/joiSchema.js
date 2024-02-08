const Joi = require('joi');

// Патерн для імені були багато правок від QA тому він став таким великим
// кейси для імені: Дмитро Д.Д., Дмитро Дмитро Дмитрович, Дмитро-Дмитро Д.Д., Дмитро-Дмитро Дмитро Дмитрович, Дмитро - Дмитро Д.Д., Дмитро - Дмитро Дмитро Дмитрович
const nameRegexp =
  /^[А-ЯІЇЄ][а-яіїє'-]+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$|^[А-ЯІЇЄ][а-яіїє'-]+\s[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ][а-яіїє]+$|^[А-ЯІЇЄ][а-яіїє'-]+-[А-ЯІЇЄ][а-яіїє'-]+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$|^[А-ЯІЇЄ][а-яіїє'-]+-[А-ЯІЇЄ][а-яіїє'-]+\s[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ][а-яіїє]+$|^[А-ЯІЇЄ][а-яіїє'-]+\s-\s[А-ЯІЇЄ][а-яіїє'-]+\s[А-ЯІЇЄ]\.[А-ЯІЇЄ]\.$|^[А-ЯІЇЄ][а-яіїє'-]+\s-\s[А-ЯІЇЄ][а-яіїє'-]+\s[А-ЯІЇЄ][а-яіїє]+\s[А-ЯІЇЄ][а-яіїє]+$/;

const schemaPerson = Joi.object({
  name: Joi.string().required().pattern(nameRegexp),
  position: Joi.string().required(),
  rank: Joi.string().required(),
  rankShort: Joi.string(),
});

const schemaPersonUpdate = Joi.object({
  name: Joi.string().pattern(nameRegexp),
  position: Joi.string(),
  rank: Joi.string(),
});

const schemaCar = Joi.object({
  carName: Joi.string().required(),
  sign: Joi.string().required(),
  fuelType: Joi.string().required(),
  fuelConsumption: Joi.string().required(),
  oilType: Joi.string().required(),
  oilConsumption: Joi.string().required(),
  exploitationGroup: Joi.string().required(),
  exploitationGroupShort: Joi.string().required(),
  driver: Joi.string().required().pattern(nameRegexp),
  driverRank: Joi.string().required(),
  unit: Joi.string().required(),
  senior: Joi.string().required().pattern(nameRegexp),
  seniorRank: Joi.string().required(),
});

const schemaCarUpdate = Joi.object({
  carName: Joi.string(),
  sign: Joi.string(),
  fuelType: Joi.string(),
  fuelConsumption: Joi.string(),
  oilType: Joi.string(),
  oilConsumption: Joi.string(),
  exploitationGroup: Joi.string(),
  exploitationGroupShort: Joi.string(),
  driver: Joi.string().pattern(nameRegexp),
  driverRank: Joi.string(),
  unit: Joi.string(),
  senior: Joi.string().pattern(nameRegexp),
  seniorRank: Joi.string(),
});

const schemaRoute = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  return: Joi.string().valid('так', 'ні').required(),
});

const schemaRouteUpdate = Joi.object({
  from: Joi.string(),
  to: Joi.string(),
  return: Joi.string().valid('так', 'ні'),
});

module.exports = {
  schemaPerson,
  schemaPersonUpdate,
  schemaCar,
  schemaCarUpdate,
  schemaRoute,
  schemaRouteUpdate,
};
