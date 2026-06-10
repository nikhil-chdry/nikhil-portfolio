import { useMemo } from "react";

export function SkyBackground() {
  const birds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        top: 15 + Math.random() * 50,
        delay: i * 7 + Math.random() * 8,
        duration: 28 + Math.random() * 14,
        scale: 0.6 + Math.random() * 0.7,
      })),
    [],
  );

  return (
    <div className="sky-stage" aria-hidden="true">
      <div className="sun-glow" />
      <div className="cloud-layer l1" />
      <div className="cloud-layer l2" />
      <div className="cloud-layer l3" />
      {birds.map((b) => (
        <div
          key={b.id}
          className="bird"
          style={{
            top: `${b.top}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            transform: `scale(${b.scale})`,
          }}
        >
          <svg
            viewBox="0 0 24 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M2 10 Q6 2 12 8 Q18 2 22 10" />
          </svg>
        </div>
      ))}
    </div>
  );
}
