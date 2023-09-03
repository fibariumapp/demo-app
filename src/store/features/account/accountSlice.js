import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    status: false,
  },
  reducers: {
    setAccountStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setAccountStatus } = accountSlice.actions;

export default accountSlice.reducer;