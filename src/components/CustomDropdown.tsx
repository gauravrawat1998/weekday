import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

type ValueType = {
  value: string | number;
  label: string;
};

interface CustomDropdownProps {
  options: Array<ValueType>;
  value: ValueType | null;
  onChange: Function;
  stateKey: string;
  placeholder: string;
  label?: string;
}

const CustomDropdown = (props: CustomDropdownProps) => {
  const { label, options, onChange, placeholder } = props;
  return (
    <div>
      <p>{label || placeholder}</p>
      <Dropdown
        options={options}
        onChange={(e) => onChange(props.stateKey, e)}
        value={props.value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomDropdown;
