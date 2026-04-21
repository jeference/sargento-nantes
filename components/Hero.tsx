import Image from "next/image";

export function Hero() {
  return (
    <section className="relative z-10 flex w-full flex-col items-center text-center">
      <div className="relative h-[50vh] max-h-[540px] min-h-[280px] w-full">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.25),transparent_65%)] blur-2xl"
        />

        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-gold-600/40 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.95)]">
          <Image
            src="/nantes.png"
            alt="Sargento Nantes"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover object-[50%_20%]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 via-black/15 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black via-black/85 via-35% to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5"
          />

          <div className="absolute inset-x-0 top-4 flex items-center justify-center gap-2.5 text-[9px] tracking-[0.38em] text-gold-500 sm:top-5 sm:text-[10px]">
            <span className="h-px w-6 bg-gold-600/70" />
            <span className="font-medium">SARGENTO NANTES · CANAL VIP</span>
            <span className="h-px w-6 bg-gold-600/70" />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-6 pt-20 sm:px-8 sm:pb-8">
            <h1 className="font-display text-[32px] leading-[0.92] tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-bone">VOCÊ VAI VER O QUE</span>
              <span className="block text-gold-gradient">A MÍDIA ESCONDE</span>
              <span className="block text-bone">DE VOCÊ</span>
            </h1>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-sm text-balance text-sm leading-snug text-bone/70 sm:mt-5 sm:text-base">
        Bandido se dando mal, bastidores de operações e dicas de segurança para você proteger sua família.
      </p>
    </section>
  );
}
