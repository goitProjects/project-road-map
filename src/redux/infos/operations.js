import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import {fetchData} from '../../frontend/utils/IndexedDB'

export const roadApi = axios.create({
  baseURL: 'http://localhost:3030/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchInfosThunk = createAsyncThunk(
  'fetchInfos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await roadApi.get('/infos');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Cars

export const addCarsThunk = createAsyncThunk(
  'addCars',
  async (body, { rejectWithValue }) => {
    const data = {
      carName: body.carName,
      sign: body.sign.toUpperCase(),
      fuelType: body.fuelType,
      fuelConsumption: body.fuelConsumption,
      oilType: body.oilType,
      oilConsumption: body.oilConsumption,
      exploitationGroup: body.exploitationGroup,
      exploitationGroupShort: body.exploitationGroupShort,
      driver: body.driver,
      driverRank: body.driverRank,
      unit: body.unit,
      senior: body.senior,
      seniorRank: body.seniorRank,
    };
    try {
      const res = await roadApi.post('/infos/cars', data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCarsThunk = createAsyncThunk(
  'deleteCars',
  async (sign, { rejectWithValue }) => {
    try {
      await roadApi.delete(`/infos/cars/${sign}`);
      toast.success('Автомобіль успішно видалено');
      return sign;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCarsThunk = createAsyncThunk(
  'updateCars',
  async (body, { rejectWithValue }) => {
    const newBody = {
      carName: body.carName,
      sign: body.sign.toUpperCase(),
      fuelType: body.fuelType,
      fuelConsumption: String(body.fuelConsumption),
      oilType: body.oilType,
      oilConsumption: String(body.oilConsumption),
      exploitationGroup: body.exploitationGroup,
      exploitationGroupShort: body.exploitationGroupShort,
      driver: body.driver,
      driverRank: body.driverRank,
      unit: body.unit,
      senior: body.senior,
      seniorRank: body.seniorRank,
    };
    try {
      const { data } = await roadApi.put(
        `/infos/cars/${body.oldSign}`,
        newBody
      );
      if (!data) {
        throw new Error('Нема такого автомобіля');
      }
      return { ...data, oldSign: body.oldSign };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Personnel

export const addPersonnelThunk = createAsyncThunk(
  'addPersonnel',
  async (body, { rejectWithValue }) => {
    const data = {
      name: body.name,
      rank: body.rank,
      position: body.position,
      rankShort: body.rankShort,
    };
    try {
      const res = await roadApi.post('/infos/personnel', data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePersonnelThunk = createAsyncThunk(
  'deletePersonnel',
  async (name, { rejectWithValue }) => {
    try {
      await roadApi.delete(`/infos/personnel/${name}`);
      toast.success('Людину успішно видалено');
      return name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePersonnelThunk = createAsyncThunk(
  'updatePersonnel',
  async (body, { rejectWithValue }) => {
    const newBody = {
      name: body.name,
      rank: body.rank,
      position: body.position,
      rankShort: body.rankShort,
    };
    try {
      const { data } = await roadApi.put(
        `/infos/personnel/${body.oldName}`,
        newBody
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const fetchInfosThunkDB = createAsyncThunk(
  'fetchInfos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchData();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

