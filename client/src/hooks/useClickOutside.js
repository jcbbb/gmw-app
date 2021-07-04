import React from "react";

export function useClickOutside(elRef, cb) {
  const cbRef = React.useRef(cb);
  cbRef.current = cb;

  React.useEffect(() => {
    const handler = (ev) => {
      const key = ev.key || ev.keyCode;
      if (key === "Escape" || key === "Esc" || key === 27) {
        cbRef.current(ev);
      }

      if (elRef.current && !elRef.current.contains(ev.target)) {
        cbRef.current(ev);
      }
    };

    document.addEventListener("click", handler);
    document.addEventListener("keyup", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("keyup", handler);
    };
  }, [elRef, cbRef]);
}
