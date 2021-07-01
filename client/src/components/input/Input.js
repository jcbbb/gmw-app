import React from "react";
import { useField } from "@formiz/core";

function Input(props) {
  const { setValue, value, id, isPristine, isSubmitted, isValid } = useField(props);
  const { name, label, type } = props;

  const showError = !isValid && (!isPristine || isSubmitted);
  return (
    <div className="w-full">
      {label ? (
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      ) : null}
      <input
        value={value || ""}
        onChange={({ target }) => setValue(target.value)}
        name={name}
        id={id}
        type={type}
        className="appearance-none block w-full outline-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 leading-tight focus:bg-white focus:border-gray-500 duration-200"
        autoComplete={`current-${name}`}
      />
      {showError ? <span class="text-red-600 text-sm">Please fill out this field.</span> : null}
    </div>
  );
}

export default Input;
