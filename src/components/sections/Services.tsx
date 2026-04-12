import { brand } from "@/config/brand";

export default function Services() {
  const whatsappUrl = `${brand.whatsapp.url}?text=${encodeURIComponent(brand.whatsapp.defaultMessage)}`;

  return (
    <section id="servicios" className="py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">
            Lo que ofrecemos
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Todo lo que necesitás
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-yellow/50">
              en un solo lugar.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Sin complicaciones. Sin excusas. Solo resultados.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {brand.services.map((service, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                service.highlight
                  ? "bg-gradient-to-br from-brand-yellow/10 to-brand-yellow/5 border border-brand-yellow/30 hover:border-brand-yellow/50"
                  : "bg-brand-card border border-brand-border hover:border-white/20"
              }`}
            >
              {service.highlight && (
                <span className="absolute top-4 right-4 bg-brand-yellow text-brand-dark text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full">
                  Destacado
                </span>
              )}

              <div className="text-4xl mb-4">{service.icon}</div>
              <h3
                className={`text-lg font-bold mb-2 ${
                  service.highlight ? "text-brand-yellow" : "text-white"
                }`}
              >
                {service.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>

              {service.name === "Primera Clase Gratis" && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-whatsapp text-sm font-semibold hover:gap-3 transition-all"
                >
                  Reservar ahora
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 mb-4">
            ¿No sabés por dónde empezar? Nosotros te orientamos.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-yellow hover:bg-brand-yellow-hover text-brand-dark px-8 py-4 rounded-2xl text-base font-black transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-brand-yellow/20"
          >
            Escribinos por WhatsApp
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
