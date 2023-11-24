import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDomain: null,
};

export const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    setSelectedDomain: (state, action) => {
      state.selectedDomain = action.payload;
    },
  },
});

export const { setSelectedDomain } = domainSlice.actions;

export default domainSlice.reducer;
