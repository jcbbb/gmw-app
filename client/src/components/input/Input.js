import React from "react";
import { useField } from "@formiz/core";

function Input(props) {
  const { setValue, value, id, isPristine, isSubmitted, isValid } = useField(props);
  const { name, label, type, className, placeholder } = props;

  const showError = !isValid && (!isPristine || isSubmitted);
  return (
    <div className="w-full">
      {label ? (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        value={value || ""}
        onChange={({ target }) => setValue(target.value)}
        name={name}
        id={id}
        type={type}
        className={`input ${className}`}
        autoComplete={`current-${name}`}
        placeholder={placeholder}
      />
      {showError ? <span className="text-red-600 text-sm">Please fill out this field.</span> : null}
    </div>
  );
}

export default Input;
