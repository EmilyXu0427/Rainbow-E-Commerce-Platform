import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

//source: https://www.youtube.com/watch?v=MNs_7avLIJ4
const store = configureStore({
  reducer: rootReducer,
});

export default store;