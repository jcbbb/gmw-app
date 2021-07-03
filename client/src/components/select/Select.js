import React from "react";
import { useField } from "@formiz/core";

function Select(props) {
  const { setValue, value, id, isPristine, isSubmitted, isValid } = useField(props);
  const { name, label, className, placeholder, children } = props;

  const showError = !isValid && (!isPristine || isSubmitted);
  return (
    <div className="w-full">
      {label ? (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <select
        value={value || ""}
        onChange={({ target }) => setValue(target.value)}
        name={name}
        id={id}
        className={`input ${className}`}
        autoComplete={`current-${name}`}
        placeholder={placeholder}
      >
        {children}
      </select>
      {showError ? <span className="text-red-600 text-sm">Please fill out this field.</span> : null}
    </div>
  );
}

export default Select;
