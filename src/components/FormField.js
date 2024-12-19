
import React from "react";

const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  options,
  renderOption, // Custom render function for options
  required = false,
  step,
  placeholder = "",
  readOnly = false // ✅ New prop for handling readOnly fields
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        {label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-600"
          required={required}
        >
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {renderOption ? renderOption(option) : option.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 border border-gray-600"
          required={required}
          step={step}
          readOnly={readOnly} // ✅ Pass the readOnly prop to the input
        />
      )}
    </div>
  );
};

export default FormField;
