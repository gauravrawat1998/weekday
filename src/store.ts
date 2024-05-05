import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./reducer/jobSlice";

export default configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
