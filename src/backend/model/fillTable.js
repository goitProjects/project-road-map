const ExcelJS = require('exceljs');
const path = require('path');
const {
  shortRanksEnum,
  monthArr,
  monthMapping,
} = require('./../services/constants');
const formatDate = require('./../services/formatDate');

const pathToExcel = path.resolve(__dirname, '../fileStorage/excel/roadXS.xlsx');

// при кожному оновленні файлу бордери цих клітинок зникають, зробив масив з індексами, щоб їх знову встановити циклом
const rightBorderFirstTable = [11, 14, 16, 18];
const secondTableKeys = [
  'from',
  'depTime',
  'arrTime',
  ['mileage', 'withCargo'],
  ['mileage', 'withoutCargo'],
  ['mileage', 'total'],
  ['mileage', 'withTrailer'],
  ['mileage', 'withTug'],
  ['motorHours', 'onStay'],
  ['motorHours', 'onMove'],
  ['motorHours', 'sum'],
  ['work', 'nameCargo'],
  ['work', 'weight'],
  'odometer',
];

const fillTable = async (body = {}) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(pathToExcel);

  const worksheet = workbook.getWorksheet(`Ш Лист 1`);
  const subWorksheet = workbook.getWorksheet(`Ш Лист 2`);

  // блок з 2 if-ів на опрацювання данних по таблицях і віддаємо на закачку
  // якщо данних немає (тобто масив порожній), то очищаємо таблицю і теж віддаємо на закачку(валідації нема)
  if (body.facts.length === 0) {
    for (let i = 12; i <= 30; i += 2) {
      const row = worksheet.getRow(i);
      for (let i = 9; i < 19; i++) {
        row.getCell(i).value = '';
        row.getCell(i).alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
        if (rightBorderFirstTable.includes(i)) {
          row.getCell(i).border = {
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        } else {
          row.getCell(i).border = {
            bottom: { style: 'thin' },
          };
        }
      }
    }
  } else {
    worksheet.getCell('N2').value = body.expireDate;
    worksheet.getCell('O3').value = body.documentNumber;
    worksheet.getCell('L4').value = body.militaryUnit;
    worksheet.getCell('P5').value = body.supervisor.rank;
    worksheet.getCell('L5').value = body.car.driver.name;
    worksheet.getCell('J5').value = body.car.driver.rank;

    let routeCell = worksheet.getCell('K6');
    let supervisorPosCell = worksheet.getCell('I7');
    if (!routeCell.isMerged) {
      worksheet.mergeCells('K6', 'M6');
    }
    routeCell.value = body.route;
    worksheet.getCell('K6').value = body.route;
    if (!supervisorPosCell.isMerged) {
      worksheet.mergeCells('I7', 'M7');
    }

    worksheet.getCell('P10').value = formatDate(body.formal.documentDateLeave);
    worksheet.getCell('R10').value = formatDate(body.formal.documentDateCome);

    supervisorPosCell.value = body.supervisor.position;
    worksheet.getCell('R7').value = body.supervisor.name;
    worksheet.getCell('J33').value = formatDate(body.documentDate);
    worksheet.getCell('L33').value = body.car.carName;
    worksheet.getCell('M33').value = body.car.carSign;
    worksheet.getCell('P33').value = body.car.exploitationGroup;
    worksheet.getCell('K33').value = `Наряд № ${body.dutyNumber}`;

    const rowCounts = Math.ceil(body.facts.length * 2 + 12 - 2);

    for (let i = 12; i <= rowCounts; i += 2) {
      const row = worksheet.getRow(i);

      if (body) {
        for (let j = 9; j < 19; j++) {
          switch (j) {
            case 9:
              row.getCell(j).value =
                shortRanksEnum[body.supervisor.rank.toLowerCase()];
              break;
            case 10:
              row.getCell(j).value = body.supervisor.name;
              break;
            case 11:
            case 14:
              row.getCell(j).value = body.depTime;
              break;
            case 12:
              row.getCell(j).value =
                shortRanksEnum[body.engineer.rank.toLowerCase()];
              break;
            case 13:
              row.getCell(j).value = body.engineer.name;
              break;
            case 15:
              const { departure, arrival } =
                body.facts[Math.floor((i - 12) / 2)];
              const depSplit = departure.time.split(' ');
              const arrSplit = arrival.time.split(' ');
              // monthMapping[0] - мапа місяців, щоб замінити назву місяця на цифру нап. "Jan" - 01
              let formattedDate = `${depSplit[0]} ${depSplit[3]}.${
                monthMapping[depSplit[2]]
              }.${depSplit[4]}`;
              let arrivalFormattedDate = `${arrSplit[0]} ${arrSplit[3]}.${
                monthMapping[arrSplit[2]]
              }.${arrSplit[4]}`;

              row.getCell(j - 4).value = `${depSplit[3]}.${
                monthMapping[depSplit[2]]
              }.${depSplit[4]}`;
              row.getCell(j - 1).value = `${arrSplit[3]}.${
                monthMapping[arrSplit[2]]
              }.${arrSplit[4]}`;
              row.getCell(j).value = formattedDate;
              row.getCell(j + 1).value = departure.odometer;
              row.getCell(j + 2).value = arrivalFormattedDate;
              row.getCell(j + 3).value = arrival.odometer;
              row.getCell(j).alignment = {
                vertical: 'middle',
                horizontal: 'center',
              };
              break;
            default:
              break;
          }
        }
      }
    }
    if (rowCounts < 30) {
      for (let i = rowCounts + 2; i <= 30; i += 2) {
        const row = worksheet.getRow(i);
        for (let i = 9; i < 19; i++) {
          row.getCell(i).value = '';
          row.getCell(i).alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };
          if (rightBorderFirstTable.includes(i)) {
            row.getCell(i).border = {
              bottom: { style: 'thin' },
              right: { style: 'thin' },
            };
          } else {
            row.getCell(i).border = {
              bottom: { style: 'thin' },
            };
          }
        }
      }
    }

    if (body.expenses.length > 0) {
      const rowCountsPMM = Math.ceil(body.expenses.length + 35);

      for (let i = 36; i <= rowCountsPMM; i++) {
        const row = worksheet.getRow(i);
        const number = Math.floor(i - 36);
        const {
          name,
          amountBefore,
          amountDuring,
          expense,
          byNorm,
          economy,
          overExpense,
          code,
          got,
          date,
        } = body.expenses[number];

        for (let j = 9; j < 18; j++) {
          switch (j) {
            case 9:
              row.getCell(j).value = name;
              break;
            case 10:
              row.getCell(j).value = code;
              break;
            case 11:
              row.getCell(j).value = amountBefore;
              break;
            case 12:
              row.getCell(j).value = date;
              break;
            case 13:
              row.getCell(j).value = got;
              break;
            case 14:
              row.getCell(j).value = amountDuring;
              break;
            case 15:
              row.getCell(j).value = expense;
              break;
            case 16:
              row.getCell(j).value = byNorm;
              break;
            case 17:
              row.getCell(j).value = economy;
              break;
            case 18:
              row.getCell(j).value = overExpense;
              break;
            default:
              break;
          }
        }
      }
      if (rowCountsPMM < 44) {
        for (let i = rowCountsPMM + 1; i <= 44; i++) {
          const row = worksheet.getRow(i);
          for (let j = 9; j < 18; j++) {
            row.getCell(j).value = '';
          }
        }
      }
    } else {
      for (let i = 36; i <= 44; i++) {
        const row = worksheet.getRow(i);
        for (let j = 9; j < 18; j++) {
          row.getCell(j).value = '';
        }
      }
    }
  }

  if (body.routes.length === 0) {
    for (let i = 6; i <= 15; i++) {
      const row = subWorksheet.getRow(i);
      for (let i = 0; i <= 14; i++) {
        row.getCell(i + 1).value = '';
        row.getCell(i + 1).alignment = {
          vertical: 'middle',
          horizontal: 'center',
          wrapText: true,
        };
      }
    }
  } else {
    subWorksheet.getCell('L24').value = body.car.driver.name;
    subWorksheet.getCell('D24').value = body.car.driver.rank;
    for (let i = 6; i < 15; i++) {
      const data = body.routes[i - 6];
      const row = subWorksheet.getRow(i);

      if (data) {
        for (let j = 0; j < secondTableKeys.length; j++) {
          const key = secondTableKeys[j];
          let value;
          if (Array.isArray(key)) {
            value = data[key[0]][key[1]];
          } else {
            value = data[key];
          }
          if (j === 0) {
            data.return === 'ні'
              ? (value = `${data.from} - ${data.to} - ${data.from}`)
              : (value = `${data.from} - ${data.to}`);
          }
          row.getCell(j + 1).value = value;
          row.getCell(j + 1).alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
          };
        }
      }
    }
    let dateSplit;
    try {
      dateSplit = body.checkedDate.split('.');
    } catch (error) {
      console.log(error);
    }
    subWorksheet.getCell('A18').value = body.car.fuelType;
    subWorksheet.getCell('F18').value = '15%';
    subWorksheet.getCell('B18').value = body.car.fuelConsumption;
    subWorksheet.getCell('D18').value = body.totalMileage;
    subWorksheet.getCell('N26').value = body.checkPerson.name;
    subWorksheet.getCell('G26').value = body.checkPerson.rank;
    subWorksheet.getCell('H18').value = Math.round(
      (body.car.fuelConsumption * body.totalMileage) / 100 -
        ((body.car.fuelConsumption * body.totalMileage) / 100) * 0.15
    );
    if (dateSplit.length) {
      subWorksheet.getCell('A27').value = `"${dateSplit[0]}" ${
        monthArr[Number(dateSplit[1])]
      }`;
      subWorksheet.getCell('A27').border = {
        bottom: { style: 'thin' },
      };
      subWorksheet.getCell('B27').value = `${Number(dateSplit[2])}`;
    } else {
      subWorksheet.getCell('A27').value = '"____"__________________';
      subWorksheet.getCell('B27').value = new Date().getFullYear();
    }
  }

  await workbook.xlsx.writeFile(pathToExcel);
};

module.exports = {
  fillTable,
};
