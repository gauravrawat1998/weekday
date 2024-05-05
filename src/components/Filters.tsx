import { useSelector } from "react-redux";
import CustomDropdown from "./CustomDropdown";

type ValueType = {
    value: string | number;
    label: string;
} | null;

interface FiltersProps {
    filters: {
        role: ValueType;
        experience: ValueType;
        location: ValueType;
        minJdSalary: ValueType;
    };
    onChange: Function;
}

const Filters = (props: FiltersProps) => {
    const {
        roleOptions,
        experienceOptions,
        locationOptions,
        minJdSalaryOptions,
    } = useSelector((state: any) => state.jobs);

    return (
        <div className="filter_row">
            <CustomDropdown
                options={roleOptions}
                value={props.filters.role}
                onChange={props.onChange}
                stateKey="role"
                placeholder="Role"
            />
            <CustomDropdown
                options={experienceOptions}
                value={props.filters.experience}
                onChange={props.onChange}
                stateKey="experience"
                placeholder="Experience"
            />
            <CustomDropdown
                options={locationOptions}
                value={props.filters.location}
                onChange={props.onChange}
                stateKey="location"
                placeholder="Location"
            />
            <CustomDropdown
                options={minJdSalaryOptions}
                value={props.filters.minJdSalary}
                onChange={props.onChange}
                stateKey="minJdSalary"
                placeholder="Minimum Base Pay Salary"
            />
        </div>
    );
};

export default Filters;
