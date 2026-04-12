import { brand } from "@/config/brand";

export default function Hero() {
  const whatsappUrl = `${brand.whatsapp.url}?text=${encodeURIComponent(brand.whatsapp.defaultMessage)}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large yellow glow top-right */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl" />
        {/* Blue glow bottom-left */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl" />
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Diagonal accent line */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-brand-yellow/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse" />
            Primera clase gratis — sin compromiso
          </div>

          {/* Main heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight mb-6">
            No es{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-yellow/60">
              motivación.
            </span>
            <br />
            Es el{" "}
            <span className="relative">
              entorno.
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-yellow/40 rounded-full" />
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl">
            {brand.slogan}
            <br />
            <span className="text-gray-400 text-base sm:text-lg mt-2 block">
              Comunidad real. Resultados reales. Sin excusas.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-whatsapp/25 group"
            >
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Reservar clase gratis
            </a>
            <a
              href="#servicios"
              className="flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:bg-white/5"
            >
              Ver servicios
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Trust signals */}
          <p className="mt-6 text-gray-500 text-sm">
            Sin tarjeta de crédito · Sin permanencia · Solo traé ganas
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {brand.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-brand-card border border-brand-border rounded-2xl p-5 text-center lg:text-left"
            >
              <div className="text-3xl md:text-4xl font-black text-brand-yellow">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 animate-bounce-slow">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
