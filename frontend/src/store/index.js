import { configureStore } from "@reduxjs/toolkit";
import composeMail from "./composeMail";

const store = configureStore({ reducer: { composeMail } });

export default store;
