import { statutAbonnementColor, statutAbonnementLabel } from "@/lib/types-negociateur";
import Badge from "@/components/commandes/Badge";

export default function StatutAbonnementBadge({ statut }: { statut: string }) {
  return <Badge label={statutAbonnementLabel(statut)} color={statutAbonnementColor(statut)} />;
}
