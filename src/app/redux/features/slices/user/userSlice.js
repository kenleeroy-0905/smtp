import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeCompany: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveCompany: (state, action) => {
      state.activeCompany = action.payload;
    },
  },
});

export const { setActiveCompany } = userSlice.actions;

export default userSlice.reducer;
