import { createSlice } from '@reduxjs/toolkit';

// * expenses array object type
// {
//       name: 'Масло',
//       amountBefore: 10,
//       amountDuring: 5,
//       expense: 5,
//       byNorm: 5,
//       economy: 0,
//       overExpense: 0,
//       code: 24,
//       got: 5,
//       date: '29.09.2023',
// },
// facts array object type {
//       departure: { time: '1 29.09.2023', odometer: 12337 },
//       arrival: { time: '2 29.09.2023', odometer: 12338 },
//     },
const initialState = {
  supervisor: {
    name: '',
    rank: '',
    position: '',
  },
  engineer: {
    name: '',
    rank: '',
    position: '',
  },
  route: '',
  documentDate: '',
  expireDate: '',
  checkedDate: '',
  checkPerson: {
    name: '',
    rank: '',
    position: '',
  },
  documentNumber: '',
  dutyNumber: '',
  militaryUnit: '',
  purposeStatement: '',
  car: {
    carSign: '',
    carName: '',
    fuelConsumption: '',
    fuelType: '',
    exploitationGroup: '',
    driver: {
      name: '',
      rank: '',
      position: '',
    },
  },
  formal: {
    documentDateCome: '',
    documentDateLeave: '',
    arrivalTime: [],
    departureTime: [],
    departureDate: [],
    arrivalDate: [],
    departureKilo: [],
    arrivalKilo: [],
  },
  expenses: [],
  facts: [],
  routes: [],
  totalMileage: 0,
  totalExpense: 0,
  pmm: {
    name: [],
    code: [],
    startCount: [],
    receivedCount: [],
    receivedDate: [],
    endCount: [],
    usedCount: [],
    normCount: [],
    ecoCount: [],
    reuseCount: [],
  },
};

export const slice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setCarWork: (state, { payload }) => {
      if (payload.route) {
        state.routes.push(payload.route);
      }
      state.totalMileage = payload.totalMileage;
      state.totalExpense = payload.totalExpense;
    },
    updateRoute: (state, { payload }) => {
      state.routes = state.routes.map(route =>
        route.id === payload.id ? payload : route
      );
    },
    deleteRoute: (state, { payload }) => {
      state.routes = state.routes.filter(route => route.id !== payload);
    },
    setPersonnel: (state, { payload }) => {
      state.car.driver = payload.driver;
      state.checkPerson = payload.checkPerson;
    },
    setCheckedDate: (state, { payload }) => {
      state.checkedDate = payload;
    },
    setPmm: (state, { payload }) => {
      for (let i = 0; i === 0 || i; i++) {
        if (!payload[`itemName_${i}`]) {
          return;
        }
        state.pmm.name.push(payload[`itemName_${i}`]);
        state.pmm.code.push(payload[`itemCode_${i}`]);
        state.pmm.startCount.push(payload[`availabilityBeforeDeparture_${i}`]);
        state.pmm.receivedCount.push(payload[`received_${i}`]);
        state.pmm.receivedDate.push(payload[`receivedDate_${i}`]);
        state.pmm.endCount.push(payload[`availability_${i}`]);
        state.pmm.usedCount.push(payload[`spent_${i}`]);
        state.pmm.normCount.push(payload[`norm_${i}`]);
        state.pmm.ecoCount.push(payload[`saving_${i}`]);
        state.pmm.reuseCount.push(payload[`overuse_${i}`]);

        state.expenses.push({
          name: payload[`itemName_${i}`],
          amountBefore: payload[`availabilityBeforeDeparture_${i}`],
          amountDuring: payload[`availability_${i}`],
          expense: payload[`spent_${i}`],
          byNorm: payload[`norm_${i}`],
          economy: payload[`saving_${i}`],
          overExpense: payload[`overuse_${i}`],
          code: payload[`itemCode_${i}`],
          got: payload[`received_${i}`],
          date: payload[`receivedDate_${i}`],
        });
      }
    },
    setMainInfo: (state, { payload }) => {
      state.documentNumber = payload.numberDocument;
      state.cars=payload.cars;
      state.car.carName = payload.carName;
      state.car.carSign = payload.sign.label;
      state.car.exploitationGroup = payload.exploitationGroup;
      state.car.fuelConsumption = payload.fuelConsumption;
      state.car.fuelType = payload.fuelType;
      state.route = payload.trafficRoute;
      state.documentDate = payload.documentDate;
      state.militaryUnit = payload.unit;
      state.headOfCarService = payload.headOfCarService;
      state.car.driver.name = payload.driver_name;
      state.car.driver.rank = payload.driver_rank;
      state.engineer.name = payload.seniorKtp.label;
      state.engineer.rank = payload.seniorKtpRank;
      state.supervisor.name = payload.senior.label;
      state.supervisor.rank = payload.seniorTechUnitRank;
      state.supervisor.position = payload.seniorTechUnitPosition;
      state.purposeStatement = payload.purposeStatement;
      state.formal.documentDateCome = payload.documentDateCome;
      state.formal.documentDateLeave = payload.documentDateLeave;
      for (let i = 0; i < payload.departureDate.length; i++) {
        state.formal.departureTime.push(payload.departureTime[i]);
        state.formal.arrivalTime.push(payload.arrivalTime[i]);
        state.formal.departureDate.push(payload.departureDate[i]);
        state.formal.arrivalDate.push(payload.arrivalDate[i]);
        state.formal.arrivalKilo.push(payload.speedOmeterArrival[i]);
        state.formal.departureKilo.push(payload.speedOmeter[i]);
        state.facts.push({
          departure: {
            time: `${payload.departureTime[0]} ${payload.departureDate[0]}`,
            odometer: payload.speedOmeter[0],
          },
          arrival: {
            time: `${payload.arrivalTime[0]} ${payload.arrivalDate[0]}`,
            odometer: payload.speedOmeterArrival[0],
          },
        });
      }
    },
  },
});

export const {
  setCarWork,
  setPersonnel,
  setCheckedDate,
  updateRoute,
  deleteRoute,
  setMainInfo,
  setPmm,
} = slice.actions;
export const formReducer = slice.reducer;
