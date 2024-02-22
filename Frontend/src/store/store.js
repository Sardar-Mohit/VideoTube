import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginSlice";
import registerReducer from "./RegisterationSlice.js";

const store = configureStore({
  reducer: { user: loginReducer, register: registerReducer },
});

export default store;
