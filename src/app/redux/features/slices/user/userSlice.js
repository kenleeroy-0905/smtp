import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCompany: null,
  hasVerifiedDomain: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveCompany: (state, action) => {
      state.activeCompany = action.payload;
    },
    setHasVerifiedDomain: (state, action) => {
      state.hasVerifiedDomain = action.payload;
    },
  },
});

export const { setActiveCompany, setHasVerifiedDomain } = userSlice.actions;

export default userSlice.reducer;
