import React, { useEffect, useState } from "react";

function useLiveAge(birthDate) {
  const [age, setAge] = useState("");
  useEffect(() => {
    const updateAge = () => {
      const now = new Date();
      const diff = now - birthDate;
      const years = diff / (365.25 * 24 * 60 * 60 * 1000);
      setAge(years.toFixed(12)); // more precision
    };
    updateAge();
    const interval = setInterval(updateAge, 50); // faster update
    return () => clearInterval(interval);
  }, [birthDate]);
  return age;
}

export default function FunFacts({ birthDate, facts }) {
  const age = useLiveAge(birthDate);

  return (
    <div>
      <h2 className="font-serif text-lg font-bold mb-3 text-white">
        Fun Facts
      </h2>
      <ul className="text-sm text-zinc-400 space-y-2">
        <li>
          - I am <span className="font-mono text-[#38bdf8]">{age}</span> years
          old
        </li>
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </div>
  );
}
