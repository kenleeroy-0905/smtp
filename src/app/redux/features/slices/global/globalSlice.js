import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGlobalLoading: false,
  activePath: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
    setActivePath: (state, action) => {
      state.activePath = action.payload;
    },
  },
});

export const { setIsGlobalLoading, setActivePath } = globalSlice.actions;

export default globalSlice.reducer;
