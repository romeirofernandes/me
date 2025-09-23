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
    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768;
    
    if (type === "default") {
      // Launch balloons twice for double the amount
      balloons();
      setTimeout(() => balloons(), isMobile ? 300 : 100);
    } else if (type === "text" && text) {
      const balloonConfig = {
        text,
        fontSize,
        color,
      };
      
      // Launch text balloons twice for double the amount
      textBalloons([balloonConfig]);
      setTimeout(() => textBalloons([balloonConfig]), isMobile ? 300 : 100);
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
