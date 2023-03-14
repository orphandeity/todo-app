import { useState, useEffect } from "react";

interface WindowSizeState {
  width: number;
  height: number;
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // add event listener
    window.addEventListener("resize", handleResize);
    // update state with initial window size
    handleResize();
    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
