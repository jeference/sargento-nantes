import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";

export default function HomePage() {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-16 px-6 py-20 sm:py-28">
      <Hero />

      <div className="w-full max-w-xl">
        <LeadForm />
      </div>

      <footer className="mt-auto flex flex-col items-center gap-3 pt-16 text-center">
        <div className="hairline w-40" />
        <p className="text-[11px] uppercase tracking-[0.32em] text-muted">
          © {new Date().getFullYear()} · Sargento Nantes
        </p>
      </footer>
    </main>
  );
}
