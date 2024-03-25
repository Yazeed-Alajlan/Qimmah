import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const InputSelect = ({
  label,
  options,
  selectedOption,
  placeholder,
  onChange: parentOnChange, // Rename to avoid conflicts with internal onChange
  setParentState, // Pass the setParentState function from the parent
  className,
  defaultValue,
  isDisabled = false,
  isMulti = false,
  closeMenuOnSelect = true,
  labelDirection = "vr",
}) => {
  const animatedComponents = makeAnimated();
  const isHorizontal = labelDirection === "hr" || labelDirection == null;

  // Default onChange handler to update parent state
  const defaultOnChange = (selected) => {
    if (parentOnChange) {
      // If parentOnChange is provided, call it
      parentOnChange(selected);
    } else {
      setParentState(selected);
    }
  };

  const isLoading = !options || options.length === 0; // Check if options array is empty or undefined

  return (
    <div
      className={`flex justify-end w-full ${isHorizontal ? "" : "flex-col"} ${
        label ? "gap-2" : ""
      }`}
    >
      <p className="text-lg my-auto whitespace-nowrap font-semibold">{label}</p>
      <Select
        components={animatedComponents}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        menuPosition={"fixed"}
        className={`w-full  ${className}`}
        placeholder={placeholder}
        options={options}
        value={selectedOption}
        onChange={defaultOnChange}
        isDisabled={isDisabled}
        isClearable
        isSearchable
        closeMenuOnSelect={closeMenuOnSelect}
        isMulti={isMulti}
        defaultValue={
          defaultValue &&
          options.find((option) => option.value === defaultValue)
        }
        isLoading={isLoading} // Show loading indicator if options array is empty or undefined
      />
    </div>
  );
};

export default InputSelect;
