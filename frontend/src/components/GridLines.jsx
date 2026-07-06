export default function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div
        className="absolute top-0 h-full w-[0.1px] bg-white"
        style={{ left: "calc(50% - 24rem)" }}
      />
      <div
        className="absolute top-0 h-full w-[0.1px] bg-white"
        style={{ left: "calc(50% + 24rem)" }}
      />
      <div
        className="absolute top-0 h-full w-[0.1px] bg-white"
        style={{ left: "calc(50% + 24rem + 16px)" }}
      />
    </div>
  );
}
