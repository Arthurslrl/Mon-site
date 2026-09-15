import { NextResponse, type NextRequest } from "next/server";
import { listCommandes } from "@/lib/repo/commandes";
import { categorieLabel, methodePaiementLabel, statutLabel } from "@/lib/types";

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
    enseigne: searchParams.get("enseigne") || undefined,
    categorie: searchParams.get("categorie") || undefined,
    search: searchParams.get("q") || undefined,
    dateFrom: searchParams.get("from") || undefined,
    dateTo: searchParams.get("to") || undefined,
    page: 1,
    pageSize: 100000,
  });

  const header = [
    "Reference",
    "Enseigne",
    "Categorie",
    "Statut",
    "Paiement",
    "N commande",
    "N suivi",
    "Total EUR",
    "Date achat",
  ];
  const lines = [header.map(csvEscape).join(";")];

  for (const r of rows) {
    lines.push(
      [
        r.reference,
        r.enseigne,
        categorieLabel(r.categorie),
        statutLabel(r.statut),
        methodePaiementLabel(r.methode_paiement),
        r.numero_commande ?? "",
        r.numero_suivi ?? "",
        r.total.toFixed(2),
        r.date_commande,
      ]
        .map(csvEscape)
        .join(";")
    );
  }

  const csv = "﻿" + lines.join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="mes-commandes.csv"`,
    },
  });
}
