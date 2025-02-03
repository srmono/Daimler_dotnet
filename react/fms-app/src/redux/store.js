import { configureStore } from "@reduxjs/toolkit";
import truckReducer from "./truckSlice";

export const store = configureStore({
  reducer: {
    trucks: truckReducer
  },
});

export default store;
