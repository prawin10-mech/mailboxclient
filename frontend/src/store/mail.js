import { createSlice } from "@reduxjs/toolkit";

const initialState = { mails: [] };

const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    newMail(state, action) {
      state.mails = [...state.mails, action.payload.mail];
    },
    getAllMails(state, action) {
      state.mails = [...action.payload.mails];
      console.log(state.mails);
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
