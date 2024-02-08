import { createAsyncThunk } from '@reduxjs/toolkit';
import { roadApi } from 'redux/infos/operations';

const downloadMainList = createAsyncThunk(
  'downloadFile',
  async (body, { rejectWithValue }) => {
    try {
      const response = await roadApi.post('/excel/main', body, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default downloadMainList;
