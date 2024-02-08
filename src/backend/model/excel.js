const { requestError } = require('../services');
const ExcelJS = require('exceljs');
const path = require('path');
const { nanoid } = require('nanoid');
const { shortRanksEnum } = require('../services/constants');

const pathToExcel = path.resolve(
  __dirname,
  '..',
  'fileStorage',
  'excel',
  'roadXS.xlsx'
);

const parseInfo = async () => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const rowDataCars = [];
  const rowDataPersonnel = [];
  const rowDataRoadType = [];
  const rowDataRoutes = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber <= 2) return;

    const rowCars = {
      carName: row.values[1], // 'A'
      sign: row.values[2], // 'B'
      fuelType: row.values[3], // 'C'
      fuelConsumption: row.values[4], // 'D'
      oilType: row.values[5], // 'E'
      oilConsumption: row.values[6], // 'F'
      exploitationGroupShort: row.values[7], // 'G'
      exploitationGroup: row.values[8], // 'H'
      driver: row.values[9], // 'I'
      driverRank: row.values[10], // 'J'
      unit: row.values[11], // 'K'
      senior: row.values[12], // 'L'
      seniorRank: row.values[13], // 'M'
    };

    const rowPersonnel = {
      position: row.values[19], // 'S'
      rank: row.values[20], // 'T'
      rankShort: row.values[21], // 'U'
      name: row.values[22], // 'V'
    };

    const rowRoadType = {
      id: row.values[15], // 'O'
      roadType: row.values[16], // 'P'
      correction: row.values[17], // 'Q'
    };

    const rowRoutes = {
      id: row.values[25], // 'Y'
      from: row.values[26], // 'Z'
      to: row.values[27], // 'AA'
      return: row.values[28], // 'AB'
      route: row.values[29], // 'AC'
    };

    if (rowCars.carName !== undefined) {
      rowDataCars.push(rowCars);
    }
    if (rowPersonnel.name !== undefined) {
      rowDataPersonnel.push(rowPersonnel);
    }
    if (rowRoadType.roadType !== undefined) {
      rowDataRoadType.push(rowRoadType);
    }
    if (rowRoutes.from !== undefined) {
      rowDataRoutes.push(rowRoutes);
    }
  });

  const data = {
    cars: rowDataCars,
    personnel: rowDataPersonnel,
    roadType: rowDataRoadType,
    routes: rowDataRoutes,
  };
  return data;
};

const addCarToExcel = async car => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  const carInExcel = data.cars.find(item => item.sign === car.sign);
  if (carInExcel) {
    throw requestError(409, 'Такий автомобіль вже існує');
  }

  const columnNumber = 1;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value) {
      lastRowNumber = i;
      break;
    }
  }

  const row = worksheet.getRow(lastRowNumber + 1);
  row.getCell(1).value = car.carName;
  row.getCell(2).value = car.sign;
  row.getCell(3).value = car.fuelType;
  row.getCell(4).value = car.fuelConsumption;
  row.getCell(5).value = car.oilType;
  row.getCell(6).value = car.oilConsumption;
  row.getCell(7).value = car.exploitationGroupShort;
  row.getCell(8).value = car.exploitationGroup;
  row.getCell(9).value = car.driver;
  row.getCell(10).value = car.driverRank;
  row.getCell(11).value = car.unit;
  row.getCell(12).value = car.senior;
  row.getCell(13).value = car.seniorRank;

  await workbook.xlsx.writeFile(pathToExcel);
  return car;
};

const updateCarInExcel = async (sign, car, flag = true, InWorkbook) => {
  const data = await parseInfo();
  if (car.sign !== sign && data.cars.find(item => item.sign === car.sign)) {
    throw requestError(409, 'Такий автомобіль вже існує');
  }
  let carInExcel = data.cars.find(item => item.sign === sign);
  if (!carInExcel) {
    throw requestError(404, 'Такого автомобіля не існує');
  }

  const columnNumber = 2;
  const startRowNumber = 2;
  let lastRowNumber;

  if (flag) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(pathToExcel);
    const worksheet = workbook.getWorksheet('Довідники');
    if (!worksheet) {
      throw new Error('Worksheet not found');
    }
    for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
      const row = worksheet.getRow(i);
      if (row.getCell(columnNumber).value === sign) {
        lastRowNumber = i;
        break;
      }
    }

    const row = worksheet.getRow(lastRowNumber);
    if (car.carName) row.getCell(1).value = car.carName;
    if (car.sign) row.getCell(2).value = car.sign;
    if (car.fuelType) row.getCell(3).value = car.fuelType;
    if (car.fuelConsumption) row.getCell(4).value = car.fuelConsumption;
    if (car.oilType) row.getCell(5).value = car.oilType;
    if (car.oilConsumption) row.getCell(6).value = car.oilConsumption;
    if (car.exploitationGroupShort)
      row.getCell(7).value = car.exploitationGroupShort;
    if (car.exploitationGroup) row.getCell(8).value = car.exploitationGroup;
    if (car.driver) row.getCell(9).value = car.driver;
    if (car.driverRank) row.getCell(10).value = car.driverRank;
    if (car.unit) row.getCell(11).value = car.unit;
    if (car.senior) row.getCell(12).value = car.senior;
    if (car.seniorRank) row.getCell(13).value = car.seniorRank;

    carInExcel = { ...carInExcel, ...car };
    await workbook.xlsx.writeFile(pathToExcel);
    return carInExcel;
  } else {
    let InputWorksheet = InWorkbook.getWorksheet('Довідники');
    for (let i = InputWorksheet.rowCount; i >= startRowNumber; i--) {
      const row = InputWorksheet.getRow(i);
      if (row.getCell(columnNumber).value === sign) {
        lastRowNumber = i;
        break;
      }
    }
    const row = InputWorksheet.getRow(lastRowNumber);

    if (car.driver) row.getCell(9).value = car.driver;
    if (car.driverRank) row.getCell(10).value = car.driverRank;
  }
};

const addPersonToExcel = async person => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  const personInExcel = data.personnel.find(item => item.name === person.name);
  if (personInExcel) {
    throw requestError(409, 'Такий службовець вже існує');
  }

  const columnNumber = 19;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value) {
      lastRowNumber = i;
      break;
    }
  }
  if (!lastRowNumber) {
    lastRowNumber = 3;
  }

  if (person.rankShort === undefined) {
    person.rankShort = shortRanksEnum[person.rank.toLowerCase()];
  }

  const row = worksheet.getRow(lastRowNumber + 1);
  row.getCell(19).value = person.position;
  row.getCell(20).value = person.rank.toLowerCase();
  row.getCell(21).value = person.rankShort;
  row.getCell(22).value = person.name;

  await workbook.xlsx.writeFile(pathToExcel);
  return person;
};

const updatePersonInExcel = async (personName, person) => {
  const workbook = new ExcelJS.Workbook();
  console.log("pathToExel: ",pathToExcel)
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  if (
    personName !== person.name &&
    data.personnel.find(item => item.name === person.name)
  ) {
    throw requestError(409, 'Такий службовець вже існує');
  }
  let personInExcel = data.personnel.find(item => item.name === personName);
  if (!personInExcel) {
    throw requestError(404, 'Такого службовця не існує');
  }

  const columnNumber = 22;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value === personName) {
      lastRowNumber = i;
      break;
    }
  }

  if (person.rank && !person.rankShort) {
    person.rankShort = shortRanksEnum[person.rank.toLowerCase()];
  }

  const row = worksheet.getRow(lastRowNumber);

  if (person.position) row.getCell(19).value = person.position;
  if (person.rank) row.getCell(20).value = person.rank.toLowerCase();
  if (person.rankShort) row.getCell(21).value = person.rankShort;
  if (person.name) row.getCell(22).value = person.name;

  const cars = data.cars.filter(item => item.driver === personName);
  if (cars.length) {
    for (const car of cars) {
      await updateCarInExcel(
        car.sign,
        { driver: person.name, driverRank: person.rankShort },
        false,
        workbook
      );
    }
  }
  personInExcel = { ...personInExcel, ...person, oldName: personName };
  await workbook.xlsx.writeFile(pathToExcel);
  return personInExcel;
};

const addRouteToExcel = async route => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  const routeInExcel = data.routes.find(
    item =>
      item.to === route.to &&
      item.from === route.from &&
      item.return === route.return
  );
  if (routeInExcel) {
    throw requestError(409, 'Такий маршрут вже існує');
  }

  const columnNumber = 26;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value) {
      lastRowNumber = i;
      break;
    }
  }

  if (route.return === undefined || route.return === 'ні') {
    route.return = 'ні';
    route.route = route.from + ' - ' + route.to + ' - ' + route.from;
  } else {
    route.return = 'так';
    route.route = route.from + ' - ' + route.to;
  }

  const row = worksheet.getRow(lastRowNumber + 1);
  row.getCell(25).value = nanoid();
  row.getCell(26).value = route.from;
  row.getCell(27).value = route.to;
  row.getCell(28).value = route.return;
  row.getCell(29).value = route.route;

  await workbook.xlsx.writeFile(pathToExcel);
  return route;
};

const updateRouteInExcel = async (id, routeNew) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  let routeInExcel = data.routes.find(item => item.id === id);
  if (!routeInExcel) {
    throw requestError(404, 'Такого маршруту не існує');
  }
  const matchRoute = data.routes.some(
    item =>
      item.to === routeNew.to &&
      item.from === routeNew.from &&
      item.return === routeNew.return &&
      item.id !== id
  );
  if (matchRoute) {
    throw requestError(409, 'Такий маршрут вже існує');
  }

  const columnNumber = 25;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value === id) {
      lastRowNumber = i;
      break;
    }
  }

  if (!routeNew.from) {
    routeNew.from = routeInExcel.from;
  }
  if (!routeNew.to) {
    routeNew.to = routeInExcel.to;
  }
  if (routeNew.return === undefined || routeNew.return === 'ні') {
    routeNew.return = 'ні';
    routeNew.route =
      routeNew.from + ' - ' + routeNew.to + ' - ' + routeNew.from;
  } else {
    routeNew.return = 'так';
    routeNew.route = routeNew.from + ' - ' + routeNew.to;
  }

  const row = worksheet.getRow(lastRowNumber);
  if (routeNew.from) row.getCell(26).value = routeNew.from;
  if (routeNew.to) row.getCell(27).value = routeNew.to;
  if (routeNew.return) row.getCell(28).value = routeNew.return;
  if (routeNew.route) row.getCell(29).value = routeNew.route;

  routeInExcel = { ...routeInExcel, ...routeNew };
  await workbook.xlsx.writeFile(pathToExcel);
  return routeInExcel;
};

const deleteCarFromExcel = async sign => {
  const workbook = new ExcelJS.Workbook();

  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  const carInExcel = data.cars.find(item => item.sign === sign);
  if (!carInExcel) {
    throw requestError(404, 'Такого автомобіля не існує');
  }

  const columnNumber = 2;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value) {
      lastRowNumber = i;
      break;
    }
  }

  let rowToDelete;
  for (let i = startRowNumber; i <= lastRowNumber; i++) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value === sign) {
      rowToDelete = i;
      break;
    }
  }

  if (rowToDelete) {
    for (let i = rowToDelete; i < lastRowNumber; i++) {
      const row = worksheet.getRow(i);
      const nextRow = worksheet.getRow(i + 1);
      for (let j = 1; j <= 13; j++) {
        row.getCell(j).value = nextRow.getCell(j).value;
      }
    }

    const lastRow = worksheet.getRow(lastRowNumber);
    for (let i = 1; i <= 13; i++) {
      lastRow.getCell(i).value = null;
    }
  }

  await workbook.xlsx.writeFile(pathToExcel);
};

const deletePersonnelFromExcel = async name => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  const personInExcel = data.personnel.find(item => item.name === name);
  if (!personInExcel) {
    throw requestError(404, 'Такого службовця не існує');
  }

  const columnNumber = 22;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value) {
      lastRowNumber = i;
      break;
    }
  }

  let rowToDelete;
  for (let i = startRowNumber; i <= lastRowNumber; i++) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value === name) {
      rowToDelete = i;
      break;
    }
  }

  if (rowToDelete) {
    for (let i = rowToDelete; i < lastRowNumber; i++) {
      const row = worksheet.getRow(i);
      const nextRow = worksheet.getRow(i + 1);
      for (let j = 19; j <= 22; j++) {
        row.getCell(j).value = nextRow.getCell(j).value;
      }
    }

    const lastRow = worksheet.getRow(lastRowNumber);
    for (let i = 19; i <= 22; i++) {
      lastRow.getCell(i).value = null;
    }
  }

  await workbook.xlsx.writeFile(pathToExcel);
};

const deleteRouteFromExcel = async id => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);
  const worksheet = workbook.getWorksheet('Довідники');
  if (!worksheet) {
    throw new Error('Worksheet not found');
  }

  const data = await parseInfo();
  const routeInExcel = data.routes.find(item => item.id === id);
  if (!routeInExcel) {
    throw requestError(404, 'Такого маршруту не існує');
  }

  const columnNumber = 25;
  const startRowNumber = 2;
  let lastRowNumber;

  for (let i = worksheet.rowCount; i >= startRowNumber; i--) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value) {
      lastRowNumber = i;
      break;
    }
  }

  let rowToDelete;
  for (let i = startRowNumber; i <= lastRowNumber; i++) {
    const row = worksheet.getRow(i);
    if (row.getCell(columnNumber).value === id) {
      rowToDelete = i;
      break;
    }
  }

  if (rowToDelete) {
    for (let i = rowToDelete; i < lastRowNumber; i++) {
      const row = worksheet.getRow(i);
      const nextRow = worksheet.getRow(i + 1);
      for (let j = 25; j <= 29; j++) {
        row.getCell(j).value = nextRow.getCell(j).value;
      }
    }

    const lastRow = worksheet.getRow(lastRowNumber);
    for (let i = 25; i <= 29; i++) {
      lastRow.getCell(i).value = null;
    }
  }

  await workbook.xlsx.writeFile(pathToExcel);
};

module.exports = {
  parseInfo,
  addCarToExcel,
  addPersonToExcel,
  updateCarInExcel,
  updatePersonInExcel,
  addRouteToExcel,
  updateRouteInExcel,
  deleteCarFromExcel,
  deletePersonnelFromExcel,
  deleteRouteFromExcel,
};
