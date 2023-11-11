import React from "react";
import Select from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "1px solid #171717",
    borderRadius: "8px",
    backgroundColor: "transparent",
    marginBottom: "20px",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#171717",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "#ffffff" : "#171717",
    backgroundColor: state.isSelected
      ? "#171717"
      : state.isFocused
      ? "#17171750"
      : "#ffffff",
  }),
};

const DefaultSelect = ({
  options,
  placeholder,
  isMulti,
  name,
  onChange,
}: {
  options: any[];
  placeholder: string;
  isMulti: boolean;
  name: string;
  onChange: (e: any) => void;
}) => {
  const preferenceOptions = [];
  for (const preference of options) {
    preferenceOptions.push({
      value: preference.id,
      label: preference.name,
    });
  }
  return (
    <div style={{ width: "100%" }}>
      <Select
        placeholder={placeholder}
        options={preferenceOptions}
        isMulti={isMulti}
        styles={customStyles}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default DefaultSelect;
