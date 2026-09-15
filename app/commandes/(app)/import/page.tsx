import ImportForm from "./ImportForm";

export default function ImportPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Importer des commandes</h1>
        <p className="mt-1 text-sm text-slate-500">
          Colle un export CSV (depuis un tableur par exemple) pour ajouter plusieurs commandes
          d&apos;un coup.
        </p>
      </div>
      <ImportForm />
    </div>
  );
}
