import React from "react";
import { useField } from "@formiz/core";

function Textarea(props) {
  const { setValue, value, id, isPristine, isSubmitted, isValid } = useField(props);
  const { name, label, cols, rows } = props;

  const showError = !isValid && (!isPristine || isSubmitted);
  return (
    <div className="w-full">
      {label ? (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <textarea
        value={value || ""}
        onChange={({ target }) => setValue(target.value)}
        name={name}
        id={id}
        className="input"
        autoComplete={`current-${name}`}
        cols={cols}
        rows={rows}
      />
      {showError ? <span className="text-red-600 text-sm">Please fill out this field.</span> : null}
    </div>
  );
}

export default Textarea;
