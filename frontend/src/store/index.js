import { configureStore } from "@reduxjs/toolkit";
import composeMailReducer from "./composeMail";
import mailReducer from "./mail";

const store = configureStore({
  reducer: { composeMail: composeMailReducer, mail: mailReducer },
});

export default store;
