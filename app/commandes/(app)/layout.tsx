import Link from "next/link";
import { logoutAction } from "../actions";

// Données métier changeant en permanence + section protégée par login :
// on rend toujours dynamiquement, jamais de version statique mise en cache.
export const dynamic = "force-dynamic";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/commandes" className="text-lg font-bold tracking-tight">
            Centrale Commandes
          </Link>
          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/commandes" className="hover:text-slate-900">
              Tableau de bord
            </Link>
            <Link href="/commandes/clients" className="hover:text-slate-900">
              Clients
            </Link>
            <Link href="/commandes/liste" className="hover:text-slate-900">
              Commandes
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
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
