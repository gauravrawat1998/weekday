import { useDispatch, useSelector } from "react-redux";
import CustomDropdown from "./CustomDropdown";
import { resetFilters, setFilters, setTempJobs } from "../reducer/jobSlice";
import { useEffect } from "react";

const Filters = () => {
    const {
        roleOptions,
        experienceOptions,
        locationOptions,
        minJdSalaryOptions,
        filters,
        jobList,
    } = useSelector((state: any) => state.jobs);
    const dispatch = useDispatch();

    const onChange = (key: string, value: any) => {
        dispatch(
            setFilters({
                key,
                value,
            })
        );
    };

    useEffect(() => {
        if (jobList && jobList?.jdList?.length) {
            let tempJobList = [...jobList?.jdList];

            if (filters?.role)
                tempJobList = tempJobList.filter(
                    (el) => el?.jobRole == filters?.role?.value
                );

            if (filters?.experience)
                tempJobList = tempJobList.filter(
                    (el) => el?.minExp >= filters?.experience?.value
                );

            if (filters?.location)
                tempJobList = tempJobList.filter(
                    (el) => el?.location == filters?.location?.value
                );

            if (filters?.minJdSalary)
                tempJobList = tempJobList.filter(
                    (el) => el?.minJdSalary >= filters?.minJdSalary?.value
                );

            dispatch(
                setTempJobs({
                    totalCount: tempJobList.length,
                    jdList: tempJobList,
                })
            );
        }
    }, [filters]);

    const onReset = () => {
        dispatch(resetFilters());
    };

    return (
        <div className="filter_row">
            <CustomDropdown
                options={roleOptions}
                value={filters?.role}
                onChange={onChange}
                stateKey="role"
                placeholder="Role"
            />
            <CustomDropdown
                options={experienceOptions}
                value={filters?.experience}
                onChange={onChange}
                stateKey="experience"
                placeholder="Experience"
            />
            <CustomDropdown
                options={locationOptions}
                value={filters?.location}
                onChange={onChange}
                stateKey="location"
                placeholder="Location"
            />
            <CustomDropdown
                options={minJdSalaryOptions}
                value={filters?.minJdSalary}
                onChange={onChange}
                stateKey="minJdSalary"
                placeholder="Minimum Base Pay Salary"
            />
            <button onClick={onReset}>Clear Filter</button>
        </div>
    );
};

export default Filters;
