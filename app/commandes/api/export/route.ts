import { NextResponse, type NextRequest } from "next/server";
import { listCommandes } from "@/lib/repo/commandes";
import { methodePaiementLabel, prioriteLabel, statutLabel } from "@/lib/types";

function csvEscape(value: string | number): string {
  const str = String(value);
  if (/[;"\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const { rows } = listCommandes({
    statut: searchParams.get("statut") || undefined,
    clientId: searchParams.get("clientId") ? Number(searchParams.get("clientId")) : undefined,
    methodePaiement: searchParams.get("methodePaiement") || undefined,
    search: searchParams.get("q") || undefined,
    dateFrom: searchParams.get("from") || undefined,
    dateTo: searchParams.get("to") || undefined,
    page: 1,
    pageSize: 100000,
  });

  const header = ["Reference", "Client", "Statut", "Priorite", "Paiement", "Total EUR", "Creee le"];
  const lines = [header.map(csvEscape).join(";")];

  for (const r of rows) {
    lines.push(
      [
        r.reference,
        r.client_nom,
        statutLabel(r.statut),
        prioriteLabel(r.priorite),
        methodePaiementLabel(r.methode_paiement),
        r.total.toFixed(2),
        r.created_at,
      ]
        .map(csvEscape)
        .join(";")
    );
  }

  const csv = "﻿" + lines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="commandes-export.csv"`,
    },
  });
}
