const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="text-center text-sm text-white py-6">
          © {year} Romeiro Fernandes. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
