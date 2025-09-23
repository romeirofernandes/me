import React, { useRef, useCallback, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { balloons, textBalloons } from "balloons-js";

const Balloons = forwardRef(function Balloons(
  { 
    type = "default", 
    text, 
    fontSize = 120, 
    color = "#000000", 
    className, 
    onLaunch 
  }, 
  ref
) {
  const containerRef = useRef(null);
  
  const launchAnimation = useCallback(() => {
    if (type === "default") {
      balloons();
    } else if (type === "text" && text) {
      textBalloons([
        {
          text,
          fontSize,
          color,
        },
      ]);
    }
    
    if (onLaunch) {
      onLaunch();
    }
  }, [type, text, fontSize, color, onLaunch]);

  // Export the launch method
  useImperativeHandle(ref, () => ({
    launchAnimation,
    ...(containerRef.current || {})
  }), [launchAnimation]);

  return <div ref={containerRef} className={cn("balloons-container", className)} />;
});

export { Balloons };
