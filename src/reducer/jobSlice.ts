import { createSlice } from "@reduxjs/toolkit";

export const LIMIT = 12;

export const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobList: null,
    jobListTemp: null,
    roleOptions: null,
    experienceOptions: null,
    locationOptions: null,
    minJdSalaryOptions: null,
    isLoading: false,
    filters: {
      role: null,
      experience: null,
      location: null,
      minJdSalary: null,
      limit: LIMIT,
      offset: 0,
    },
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobList = state.jobList
        ? {
            ...state.jobList,
            jdList: [...state?.jobList?.jdList, ...action.payload?.jdList],
          }
        : action.payload;
      state.jobListTemp = state.jobListTemp
        ? {
            ...state.jobListTemp,
            jdList: [...state?.jobListTemp?.jdList, ...action.payload?.jdList],
          }
        : action.payload;
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
    setTempJobs: (state, action) => {
      state.jobListTemp = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        [action.payload?.["key"]]: action.payload["value"],
      };
    },
    resetFilters: (state) => {
      state.filters = {
        ...state.filters,
        role: null,
        experience: null,
        location: null,
        minJdSalary: null,
      };
    },
  },
});

export const {
  setJobs,
  setOptions,
  setLoading,
  setFilters,
  setTempJobs,
  resetFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
