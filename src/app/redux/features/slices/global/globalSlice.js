import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGlobalLoading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const { setIsGlobalLoading } = globalSlice.actions;

export default globalSlice.reducer;
