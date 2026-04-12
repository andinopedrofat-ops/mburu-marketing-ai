import { brand } from "@/config/brand";

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">
            Resultados reales
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Personas reales.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-yellow/50">
              Cambios reales.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            No modelos. No filtros. Solo miembros de Mburucuya contando su historia.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brand.testimonials.map((t, i) => (
            <div
              key={i}
              className="relative bg-brand-card border border-brand-border rounded-2xl p-7 hover:border-brand-yellow/20 transition-all duration-300 group"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-7 text-6xl text-brand-yellow/10 font-serif leading-none group-hover:text-brand-yellow/20 transition-colors">
                &ldquo;
              </div>

              {/* Result badge */}
              <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full" />
                {t.result}
              </div>

              {/* Testimonial text */}
              <p className="text-gray-300 text-base leading-relaxed mb-6 italic relative z-10">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-blue to-brand-blue-mid rounded-full flex items-center justify-center text-white text-sm font-black">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">
                    Miembro hace {t.weeks} semanas
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-12 bg-gradient-to-r from-brand-yellow/5 via-brand-yellow/10 to-brand-yellow/5 border border-brand-yellow/20 rounded-2xl p-8 text-center">
          <p className="text-white font-bold text-2xl mb-2">
            ¿Querés ser el próximo testimonio?
          </p>
          <p className="text-gray-400 mb-2">
            Cada semana nuevas personas dan el primer paso en Mburucuya.
          </p>
          <p className="text-brand-yellow font-semibold text-sm">
            Tu historia empieza con una clase gratis.
          </p>
        </div>
      </div>
    </section>
  );
}
