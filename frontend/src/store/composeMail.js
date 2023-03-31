import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpened: false };
const composeMailSlice = createSlice({
  name: "compose",
  initialState,
  reducers: {
    toggleCompose(state) {
      state.isOpened = !state.isOpened;
    },
  },
});

export const composeMailActions = composeMailSlice.actions;

export default composeMailSlice.reducer;
