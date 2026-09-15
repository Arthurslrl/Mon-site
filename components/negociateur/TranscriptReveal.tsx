"use client";

import { useEffect, useState } from "react";

export default function TranscriptReveal({
  lines,
  negociationId,
}: {
  lines: string[];
  negociationId: number;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = lines.map((_, i) =>
      setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), i * 550)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [negociationId]);

  return (
    <ul className="space-y-2">
      {lines.slice(0, visibleCount).map((line, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-slate-700"
          style={{ opacity: 1, transition: "opacity 0.3s ease" }}
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
          {line}
        </li>
      ))}
      {visibleCount < lines.length ? (
        <li className="flex items-center gap-2 text-sm text-slate-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
          ...
        </li>
      ) : null}
    </ul>
  );
}
