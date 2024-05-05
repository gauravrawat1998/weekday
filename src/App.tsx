import { useState, useEffect } from "react";
import "./App.css";
import Filters from "./components/Filters";
import { useSelector, useDispatch } from "react-redux";
import { setJobs, setOptions } from "./reducer/jobSlice";

const App = () => {
  const jobList = useSelector((state: any) => state.jobs);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    role: null,
    experience: null,
    location: null,
    minJdSalary: null,
  });

  useEffect(() => {
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
        setFiltersHandlers(result?.jdList)
      })
      .catch((error) => console.error(error));
  };

  const setFiltersHandlers = (jobs: any) => {
    const tempJobs = [...jobs];
    const roleOptions = [...new Set(tempJobs.map(item => item.jobRole))].map((element: any) => {
      return {
        label: element,
        value: element,
      }
    })

    dispatch(setOptions({
      roleOptions: roleOptions
    }))
  }

  const handleStateValues = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div>
      <Filters filters={filters} onChange={handleStateValues} />
    </div>
  );
};

export default App;
