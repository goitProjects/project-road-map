import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addCarsThunk,
  addPersonnelThunk,
  deleteCarsThunk,
  deletePersonnelThunk,
  fetchInfosThunk, fetchInfosThunkDB,
  updateCarsThunk,
  updatePersonnelThunk,
} from './operations';

const initialState = {
  cars: [],
  personnel: [],
  isLoading: false,
  error: null,
};

export const slice = createSlice({
  name: 'infos',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchInfosThunk.fulfilled, (state, { payload }) => {
        state.cars = payload.cars;
        state.personnel = payload.personnel;
      })
      .addCase(addCarsThunk.fulfilled, (state, { payload }) => {
        state.cars.push(payload);
      })
      .addCase(deleteCarsThunk.fulfilled, (state, { payload }) => {
        state.cars = state.cars.filter(car => car.sign !== payload);
      })
      .addCase(updateCarsThunk.fulfilled, (state, { payload }) => {
        state.cars = state.cars.map(car =>
          car.sign === payload.oldSign ? payload : car
        );
      })
      .addCase(addPersonnelThunk.fulfilled, (state, { payload }) => {
        state.personnel.push(payload);
      })
      .addCase(deletePersonnelThunk.fulfilled, (state, { payload }) => {
        state.personnel = state.personnel.filter(
          personnel => personnel.name !== payload
        );
      })
      .addCase(updatePersonnelThunk.fulfilled, (state, { payload }) => {
        state.personnel = state.personnel.map(item =>
          item.name === payload.oldName ? payload : item
        );
      })
      // .addCase(fetchInfosThunkDB.fulfilled, (state, { payload }) => {
      //   state.cars = payload?.cars;
      //   state.personnel = payload?.personnel;
      // })
      .addMatcher(
        isAnyOf(
          fetchInfosThunkDB.fulfilled,
          addCarsThunk.fulfilled,
          deleteCarsThunk.fulfilled,
          updateCarsThunk.fulfilled,
          addPersonnelThunk.fulfilled,
          deletePersonnelThunk.fulfilled,
          updatePersonnelThunk.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchInfosThunkDB.pending,
          addCarsThunk.pending,
          deleteCarsThunk.pending,
          updateCarsThunk.pending,
          addPersonnelThunk.pending,
          deletePersonnelThunk.pending,
          updatePersonnelThunk.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchInfosThunkDB.rejected,
          addCarsThunk.rejected,
          deleteCarsThunk.rejected,
          updateCarsThunk.rejected,
          addPersonnelThunk.rejected,
          deletePersonnelThunk.rejected,
          updatePersonnelThunk.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
  },
});

export const infosReducer = slice.reducer;
