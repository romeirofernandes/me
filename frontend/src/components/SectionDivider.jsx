export default function SectionDivider({ className = "" }) {
  return (
    <div
      className={`w-full h-[0.1px] bg-white/10 ${className}`}
    />
  );
}
