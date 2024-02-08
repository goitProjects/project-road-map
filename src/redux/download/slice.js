import { createSlice } from '@reduxjs/toolkit';
import downloadMainList from './operations';

const initialState = {
  isDownloading: false,
  error: null,
};
export const slice = createSlice({
  name: 'download',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(downloadMainList.fulfilled, (state, action) => {
        state.isDownloading = false;
        state.error = null;
      })
      .addCase(downloadMainList.pending, (state, action) => {
        state.isDownloading = true;
        state.error = null;
      })
      .addCase(downloadMainList.rejected, (state, action) => {
        state.isDownloading = false;
        state.error = action.payload;
      });
  },
});

export const downloadReducer = slice.reducer;
