import { brand } from "@/config/brand";

export default function Contact() {
  const whatsappUrl = `${brand.whatsapp.url}?text=${encodeURIComponent(brand.whatsapp.defaultMessage)}`;

  const contactItems = [
    {
      icon: "📍",
      label: "Dirección",
      value: brand.contact.addressFull,
      href: brand.contact.googleMapsUrl,
    },
    {
      icon: "📱",
      label: "WhatsApp",
      value: brand.whatsapp.displayNumber,
      href: whatsappUrl,
    },
    {
      icon: "📧",
      label: "Email",
      value: brand.contact.email,
      href: `mailto:${brand.contact.email}`,
    },
    {
      icon: "📸",
      label: "Instagram",
      value: brand.contact.instagram,
      href: brand.contact.instagramUrl,
    },
  ];

  const waScripts = [
    {
      label: "Quiero info general",
      message: "Hola! Me gustaría información sobre Mburucuya Fitness Center.",
    },
    {
      label: "Reservar clase gratis",
      message: "Hola! Quiero reservar mi primera clase gratuita en Mburucuya.",
    },
    {
      label: "Ver precios y planes",
      message: "Hola! Me gustaría conocer los precios y planes disponibles.",
    },
  ];

  return (
    <section id="contacto" className="py-20 md:py-28 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">
            Contacto
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            El primer mensaje
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-yellow/50">
              es el más importante.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            Estamos en WhatsApp. Respondemos rápido y sin presión.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold text-xl mb-6">Encontranos</h3>
            <div className="space-y-4">
              {contactItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-yellow/30 transition-all duration-200 group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-white font-medium text-sm group-hover:text-brand-yellow transition-colors">
                      {item.value}
                    </div>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-600 group-hover:text-brand-yellow ml-auto transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-6">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>🕐</span>
                Horario de atención
              </h4>
              <div className="space-y-2">
                {brand.hours.map((h, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{h.days}</span>
                    <span
                      className={`text-sm font-semibold ${
                        h.time === "Cerrado" ? "text-red-400" : "text-brand-yellow"
                      }`}
                    >
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: WhatsApp CTAs */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold text-xl mb-6">Escribinos ahora</h3>

            {/* Main WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-whatsapp hover:bg-whatsapp-hover text-white p-8 rounded-2xl font-black text-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-whatsapp/20 mb-6 group"
            >
              <svg
                className="w-8 h-8 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div className="text-left">
                <div>Escribinos ahora</div>
                <div className="text-white/70 text-sm font-normal">
                  {brand.whatsapp.displayNumber}
                </div>
              </div>
            </a>

            {/* Quick message buttons */}
            <p className="text-gray-500 text-sm mb-3">O elegí un tema rápido:</p>
            <div className="space-y-3">
              {waScripts.map((script, i) => {
                const url = `${brand.whatsapp.url}?text=${encodeURIComponent(script.message)}`;
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-brand-card border border-brand-border hover:border-whatsapp/40 text-gray-300 hover:text-white px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200 group"
                  >
                    {script.label}
                    <svg
                      className="w-4 h-4 text-gray-600 group-hover:text-whatsapp transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                );
              })}
            </div>

            {/* Reassurance */}
            <div className="mt-6 p-5 bg-brand-card border border-brand-border rounded-2xl">
              <p className="text-gray-400 text-sm text-center leading-relaxed">
                Respondemos en menos de una hora.
                <br />
                <span className="text-brand-yellow font-medium">
                  Sin presión, sin ventas agresivas.
                </span>{" "}
                Solo ayuda real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
