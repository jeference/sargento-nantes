import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";

export default function HomePage() {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-xl flex-col gap-4 px-5 pb-4 pt-3 sm:gap-6 sm:px-6 sm:pb-6 sm:pt-5">
      <Hero />

      <LeadForm />

      <footer className="flex flex-col items-center gap-1.5 pt-1 text-center">
        <div className="hairline w-20" />
        <p className="text-[10px] uppercase tracking-[0.32em] text-muted">
          © {new Date().getFullYear()} · Sargento Nantes
        </p>
      </footer>
    </main>
  );
}
