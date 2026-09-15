import { STATUTS } from "@/lib/types";
import Badge from "./Badge";

export default function StatutBadge({ statut }: { statut: string }) {
  const meta = STATUTS.find((s) => s.value === statut);
  return <Badge label={meta?.label ?? statut} color={meta?.color ?? "slate"} />;
}
