import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: null,
    roleOptions: null,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobList = action.payload;
    },
    setOptions: (state, action) => {
      state.roleOptions = action.payload.roleOptions;
    },
  },
});

export const { setJobs, setOptions } = jobSlice.actions;

export default jobSlice.reducer;
