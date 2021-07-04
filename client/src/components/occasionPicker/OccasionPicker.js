import React from "react";
import { useField } from "@formiz/core";

function OccasionPicker(props) {
  const { setValue, value, id, isPristine, isSubmitted, isValid } = useField(props);
  const { label, count } = props;

  const showError = !isValid && (!isPristine || isSubmitted);

  const children = [];

  for (let i = 0; i < count; i++) {
    const isActive = i === value;
    children.push(
      <div
        className={`group shadow-md max-w-max rounded-lg overflow-hidden border-2 border-transparent hover:border-purple-600 duration-200 cursor-pointer focus:border-purple-600 outline-none ${
          isActive ? "border-purple-600" : ""
        }`}
        tabIndex="0"
        onClick={() => setValue(i)}
      >
        <div className="flex justify-center p-6">
          <svg
            width="68"
            height="66"
            viewBox="0 0 68 66"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M60.8309 41.1105V29.6745C60.8309 26.4948 58.1092 23.903 54.7703 23.903H48.9902V13.7227C48.9902 12.841 48.2467 12.1329 47.3207 12.1329H45.1883V12.0928C46.9841 11.4516 48.2607 9.79491 48.2607 7.87109C48.2607 5.94728 45.7214 1.9126 44.9358 0.723587L44.9217 0.696834C44.8095 0.53654 44.6692 0.402926 44.5009 0.296063C44.1221 0.0422091 43.6732 -0.051277 43.2242 0.028832C42.7752 0.108941 42.3824 0.336118 42.1159 0.696834L42.1018 0.723587C41.3302 1.9126 38.7769 5.94728 38.7769 7.87109C38.7769 9.79491 40.0536 11.4382 41.8493 12.0928V12.1329H39.7169C38.791 12.1329 38.0474 12.841 38.0474 13.7227V23.903H29.9806V13.7227C29.9806 12.841 29.2371 12.1329 28.311 12.1329H26.1786V12.0928C27.9744 11.4516 29.251 9.79491 29.251 7.87109C29.251 5.94728 26.7117 1.9126 25.9261 0.723587L25.912 0.696834C25.7998 0.53654 25.6595 0.402926 25.4912 0.296063C24.7196 -0.224946 23.6533 -0.0379 23.1062 0.696834L23.0922 0.723587C22.3205 1.9126 19.7673 5.94728 19.7673 7.87109C19.7673 9.79491 21.044 11.4382 22.8396 12.0928V12.1329H20.7072C19.7813 12.1329 19.0377 12.841 19.0377 13.7227V23.903H13.8048C10.4658 23.903 7.74414 26.4948 7.74414 29.6745V34.524V34.5374V34.5508V41.0971H7.37939C3.31087 41.0971 0.0140468 44.2501 0 48.1244V53.5352V53.5485V53.5619V64.4101C0 65.2919 0.743534 66 1.66952 66H66.3305C67.2564 66 68 65.292 68 64.4101V48.1111C68 44.3169 64.8014 41.2174 60.8311 41.1105H60.8309ZM26.6275 15.3126V23.903H22.3627V15.3126H26.6275ZM45.6513 15.3126V23.903H41.3864V15.3126H45.6513ZM54.7703 27.0827C56.2714 27.0827 57.492 28.245 57.492 29.6745V32.7339C56.9449 32.5736 56.4257 32.3197 55.9627 31.9857L55.9487 31.9723C52.9184 29.9416 48.8359 29.9416 45.8056 31.9723C43.8835 33.2949 41.3021 33.2949 39.3802 31.9723C36.3499 29.9416 32.2674 29.9416 29.2371 31.9723C27.315 33.2949 24.7336 33.2949 22.8117 31.9723C21.3526 30.9569 19.5428 30.4092 17.733 30.4359C15.9233 30.4092 14.1134 30.9569 12.6404 31.9857C12.1774 32.3196 11.6584 32.5735 11.1112 32.7339V29.6878C11.1112 28.2583 12.3317 27.1094 13.8188 27.096H54.7703V27.0827ZM9.41362 44.2901H60.6205C62.8371 44.2901 64.6469 46.0135 64.6469 48.1244V51.8118C63.6509 51.6113 62.6968 51.1972 61.8832 50.6094L61.8691 50.596C58.0953 48.0576 53.0167 48.0576 49.2288 50.596C46.5632 52.4263 42.9857 52.4263 40.3201 50.596C36.5462 48.0576 31.4676 48.0576 27.6938 50.596L27.6797 50.6094C26.4171 51.5178 24.8458 51.9988 23.2605 51.9721H23.2324C21.6471 52.0121 20.0758 51.5178 18.7991 50.6094C16.9754 49.3402 14.7306 48.6588 12.4719 48.6989C10.2132 48.6721 7.96847 49.3402 6.13065 50.6227C5.30291 51.2106 4.36296 51.6247 3.35285 51.8251V48.1378C3.35285 46.0269 5.1626 44.3035 7.37923 44.2901H9.41347H9.41362Z"
              fill="#506E70"
            />
          </svg>
        </div>
        <div
          className={`bg-gray-100 group-hover:bg-purple-600 group-focus:bg-purple-600 ${
            isActive ? "bg-purple-600" : ""
          }`}
        >
          <p
            className={`font-bold py-3 px-9 group-hover:text-white group-focus:text-white text-sm ${
              isActive ? "text-white" : "text-purple-600"
            }`}
          >
            Birthday gifts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {label ? (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div
        className="overflow-hidden border border-gray-200 rounded-lg focus-within:border-gray-500 outline-none"
        tabIndex="0"
      >
        <input id={id} className="opacity-0 h-0 absolute -z-10" />
        <div className="flex flex-wrap justify-between p-4 max-h-52 overflow-y-auto gap-y-2">
          {children}
        </div>
      </div>
      {showError ? <span className="text-red-600 text-sm">Please fill out this field.</span> : null}
    </div>
  );
}

export default OccasionPicker;
