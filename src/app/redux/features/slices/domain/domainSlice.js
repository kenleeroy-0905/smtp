import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDomain: null,
  domains: [],
};

export const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    setSelectedDomain: (state, action) => {
      state.selectedDomain = action.payload;
    },
    setDomains: (state, action) => {
      state.domains = action.payload;
    },
  },
});

export const { setSelectedDomain, setDomains } = domainSlice.actions;

export default domainSlice.reducer;
