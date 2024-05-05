import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: null,
    roleOptions: null,
    experienceOptions: null,
    locationOptions: null,
    minJdSalaryOptions: null,
    isLoading: false,
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobList = action.payload;
    },
    setOptions: (state, action) => {
      state.roleOptions = action.payload.roleOptions;
      state.experienceOptions = action.payload.experienceOptions;
      state.locationOptions = action.payload.locationOptions;
      state.minJdSalaryOptions = action.payload.minJdSalaryOptions;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setJobs, setOptions, setLoading } = jobSlice.actions;

export default jobSlice.reducer;
