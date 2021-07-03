import React from "react";

function Confirmation({ heading, text, onConfirm, onCancel }) {
  return (
    <div className="container p-6 max-w-sm mx-auto space-y-3 bg-white rounded-lg">
      <h2 className="text-xl font-bold text-gray-900">{heading}</h2>
      {text && <p>{text}</p>}
      <div className="flex justify-between space-x-4">
        <button
          onClick={onCancel}
          className="btn-secondary text-red-600 bg-red-100 hover:bg-red-200 w-full"
        >
          Cancel
        </button>
        <button onClick={onConfirm} className="btn-primary bg-red-600 hover:bg-red-700 w-full">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Confirmation;
