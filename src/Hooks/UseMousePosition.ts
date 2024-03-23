import React from "react";
import { Vector2 } from "three";
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<Vector2>(
    new Vector2(0)
  );
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition(
        new Vector2(ev.clientX, window.innerHeight - ev.clientY)
      );
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default useMousePosition;
