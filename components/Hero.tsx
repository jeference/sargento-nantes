import Image from "next/image";

export function Hero() {
  return (
    <section className="relative z-10 flex w-full flex-col items-center text-center">
      <div className="relative w-full">
        <div
          aria-hidden
          className="absolute -inset-8 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.28),transparent_65%)] blur-2xl"
        />

        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gold-600/40 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.95)] sm:aspect-[5/6]">
          <Image
            src="/nantes.png"
            alt="Sargento Nantes"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover object-[50%_18%]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/20 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black via-black/90 via-35% to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/5"
          />

          <div className="absolute inset-x-0 top-6 flex items-center justify-center gap-3 text-[10px] tracking-[0.42em] text-gold-500 sm:top-8 sm:text-[11px]">
            <span className="h-px w-8 bg-gold-600/70" />
            <span className="font-medium">SARGENTO NANTES · CANAL VIP</span>
            <span className="h-px w-8 bg-gold-600/70" />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 pt-24 sm:px-10 sm:pb-10">
            <h1 className="font-display text-4xl leading-[0.92] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]">
              <span className="block text-bone">VOCÊ VAI VER O QUE</span>
              <span className="block text-gold-gradient">A MÍDIA ESCONDE</span>
              <span className="block text-bone">DE VOCÊ</span>
            </h1>
          </div>
        </div>
      </div>

      <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-bone/75 sm:text-lg">
        Bandido se dando mal, bastidores de operações e dicas de segurança
        para blindar sua casa e proteger quem você ama.
      </p>

      <div className="mt-10 flex items-center gap-3 text-[11px] tracking-[0.32em] text-muted">
        <span className="h-px w-6 bg-muted/60" />
        <span>100% GRÁTIS · PREENCHA ABAIXO</span>
        <span className="h-px w-6 bg-muted/60" />
      </div>
    </section>
  );
}
