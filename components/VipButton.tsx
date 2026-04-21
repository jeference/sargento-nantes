import { MessageCircle, ArrowUpRight } from "lucide-react";

export function VipButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-gold group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-5 text-base sm:text-lg animate-pulse-gold"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
      <span>ENTRAR NO GRUPO VIP</span>
      <ArrowUpRight
        className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2.5}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%)] bg-[length:200%_100%] animate-shimmer opacity-60"
      />
    </a>
  );
}
