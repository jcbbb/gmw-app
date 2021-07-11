import React from "react";

export function useMounted() {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return React.useCallback(() => ref.current, [ref]);
}
