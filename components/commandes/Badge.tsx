const COLOR_CLASSES: Record<string, string> = {
  amber: "bg-amber-100 text-amber-800",
  blue: "bg-blue-100 text-blue-800",
  violet: "bg-violet-100 text-violet-800",
  cyan: "bg-cyan-100 text-cyan-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  orange: "bg-orange-100 text-orange-800",
  slate: "bg-slate-100 text-slate-700",
};

export default function Badge({ label, color }: { label: string; color: string }) {
  const classes = COLOR_CLASSES[color] ?? COLOR_CLASSES.slate;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}
