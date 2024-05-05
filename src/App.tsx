import { useState, useEffect } from "react";
import Filters from "./components/Filters";
import { useSelector, useDispatch } from "react-redux";
import { setJobs, setOptions, setLoading } from "./reducer/jobSlice";
import { capitalizeFirstLetter } from "./utils/globalFunctions";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: any) => state.jobs);

  const [filters, setFilters] = useState({
    role: null,
    experience: null,
    location: null,
    minJdSalary: null,
  });

  useEffect(() => {
    dispatch(setLoading(true));
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
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

  const handleStateValues = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div>
      {isLoading ? (
        <img
          src="https://motiongraphicsphoebe.files.wordpress.com/2018/10/giphy.gif"
          alt="Loading..."
        />
      ) : (
        <Filters filters={filters} onChange={handleStateValues} />
      )}
    </div>
  );
};

export default App;
