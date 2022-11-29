import { createSlice } from "@reduxjs/toolkit";

export const bootstrap = createSlice({
  name: "bootstrap",
  initialState: {
    userdetails: {},
  },
  reducers: {
    setBootstrap: (state, action) => {
      state.userdetails = action.payload;
    },
  },
});

export const { setBootstrap } = bootstrap.actions;

export default bootstrap.reducer;
