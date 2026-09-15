"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
    >
      {pending ? "Négociation en cours..." : "Lancer la négociation IA"}
    </button>
  );
}

export default function NegocierButton({ action }: { action: () => void | Promise<void> }) {
  return (
    <form action={action}>
      <SubmitButton />
    </form>
  );
}
