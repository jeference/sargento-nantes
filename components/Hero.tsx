import { Insignia } from "./Insignia";

export function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center text-center">
      <div className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.42em] text-gold-600/90">
        <span className="h-px w-10 bg-gold-600/60" />
        <span className="font-medium">SARGENTO NANTES · CANAL VIP</span>
        <span className="h-px w-10 bg-gold-600/60" />
      </div>

      <Insignia className="mb-8 h-16 w-16 drop-shadow-[0_6px_22px_rgba(212,175,55,0.35)]" />

      <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-[88px]">
        <span className="block text-bone">VOCÊ VAI VER O QUE</span>
        <span className="block text-gold-gradient">A MÍDIA ESCONDE</span>
        <span className="block text-bone">DE VOCÊ</span>
      </h1>

      <p className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-bone/70 sm:text-lg">
        Bandido se dando mal, bastidores de operações
        e dicas de segurança para blindar sua casa e proteger quem você ama.
      </p>

      <div className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.32em] text-muted">
        <span className="h-px w-6 bg-muted/60" />
        <span>100% GRÁTIS! · PREENCHA AS INFORMAÇÕES ABAIXO</span>
        <span className="h-px w-6 bg-muted/60" />
      </div>
    </section>
  );
}
