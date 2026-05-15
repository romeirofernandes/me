const Border1 = ({ children }) => (
  <div className="relative w-full">
    {/* Top left corner */}
    <span className="absolute -top-px -left-px block size-6 border-dashed border-t border-l border-muted-foreground z-30 pointer-events-none" />
    {/* Top right corner */}
    <span className="absolute -top-px -right-px block size-6 border-dashed border-t border-r border-muted-foreground z-30 pointer-events-none" />
    {/* Bottom left corner */}
    <span className="absolute -bottom-px -left-px block size-6 border-dashed border-b border-l border-muted-foreground z-30 pointer-events-none" />
    {/* Bottom right corner */}
    <span className="absolute -bottom-px -right-px block size-6 border-dashed border-b border-r border-muted-foreground z-30 pointer-events-none" />
    {children}
  </div>
);

export default Border1;
