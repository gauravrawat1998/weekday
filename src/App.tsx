import { useState, useEffect } from "react";
import Filters from "./components/Filters";
import { useSelector, useDispatch } from "react-redux";
import { setJobs, setOptions, setLoading } from "./reducer/jobSlice";
import { capitalizeFirstLetter } from "./utils/globalFunctions";
import "./App.css";
import JobList from "./components/JobList";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, filters } = useSelector((state: any) => state.jobs);

  useEffect(() => {
    dispatch(setLoading(true));
    fetchJobs(filters?.limit, filters?.offset);
  }, []);

  const fetchJobs = (limit: number, offset: number) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit,
      offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        dispatch(setJobs(result));
        setFiltersHandlers(result?.jdList);
      })
      .catch((error) => console.error(error));
  };

  const setFiltersHandlers = (jobs: any) => {
    const tempJobs = [...jobs];
    const roleOptions = [...new Set(tempJobs.map((item) => item.jobRole))].map(
      (element: any) => {
        return {
          label: capitalizeFirstLetter(element),
          value: element,
        };
      }
    );

    const experienceOptions = [...new Set(tempJobs.map((item) => item.minExp))] // getting unique values
      .filter((number) => number == 0 || number) // filtering values for null check
      .sort((a, b) => a - b) // sorting
      .map((element) => {
        // mapping as label and value
        return {
          label: `${element} ${element > 1 ? "years" : "year"}`,
          value: element,
        };
      });

    const locationOptions = [...new Set(tempJobs.map((item) => item.location))]
      .filter((element) => element)
      .sort()
      .map((element) => {
        return {
          label: capitalizeFirstLetter(element),
          value: element,
        };
      });

    const minJdSalaryOptions = [
      ...new Set(tempJobs.map((item) => item.minJdSalary)),
    ]
      .filter((number) => number == 0 || number)
      .sort((a, b) => a - b)
      .map((element) => {
        return {
          label: element,
          value: element,
        };
      });

    dispatch(
      setOptions({
        roleOptions,
        experienceOptions,
        locationOptions,
        minJdSalaryOptions,
      })
    );
    dispatch(setLoading(false));
  };

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/giphy.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <>
          <h1 className="heading">WeekDay Job Portal</h1> <hr />
          <Filters />
          <JobList loadMore={fetchJobs} />
        </>
      )}
    </div>
  );
};

export default App;
