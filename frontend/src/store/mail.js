import { createSlice } from "@reduxjs/toolkit";

const initialState = { mails: [], sendedMails: [], totalUnreadMails: 0 };

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
    getSendedMails(state, action) {
      state.sendedMails = action.payload.mails;
      console.log(state.sendedMails);
    },
    getUnreadMailsCount(state, action) {
      state.totalUnreadMails = action.payload.count;
    },
  },
});

export const mailActions = mailSlice.actions;

export default mailSlice.reducer;
