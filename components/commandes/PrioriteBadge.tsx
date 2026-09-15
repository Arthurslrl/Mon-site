import { PRIORITES } from "@/lib/types";
import Badge from "./Badge";

export default function PrioriteBadge({ priorite }: { priorite: string }) {
  const meta = PRIORITES.find((p) => p.value === priorite);
  return <Badge label={meta?.label ?? priorite} color={meta?.color ?? "slate"} />;
}
