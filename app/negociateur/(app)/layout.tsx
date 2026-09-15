import Link from "next/link";
import { logoutAction } from "@/lib/auth/actions";

export const dynamic = "force-dynamic";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/negociateur" className="text-lg font-bold tracking-tight">
            Négociateur d&apos;abonnements
          </Link>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/negociateur" className="hover:text-slate-900">
              Tableau de bord
            </Link>
            <Link href="/negociateur/abonnements" className="hover:text-slate-900">
              Abonnements
            </Link>
            <Link href="/commandes" className="hover:text-slate-900">
              → Centrale Commandes
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100"
              >
                Déconnexion
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 pt-4">
        <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          Mode démo : la négociation est simulée (aucun appel réel n&apos;est passé). Voir le
          README pour ce qu&apos;il faudrait brancher pour une vraie automatisation.
        </div>
      </div>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
