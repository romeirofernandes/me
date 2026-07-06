import { memo } from "react";

export default memo(function DiagonalBackground({ children, className = "" }) {
  return (
    <div className={`relative min-h-screen ${className}`}>
      {children}
    </div>
  );
});
