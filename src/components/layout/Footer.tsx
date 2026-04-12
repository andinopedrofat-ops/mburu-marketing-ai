import Link from "next/link";
import { brand } from "@/config/brand";

export default function Footer() {
  const whatsappUrl = `${brand.whatsapp.url}?text=${encodeURIComponent(brand.whatsapp.defaultMessage)}`;

  return (
    <footer className="bg-brand-darker border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-black text-white">{brand.shortName}</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-widest leading-tight">
                Fitness<br />Center
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              {brand.description}
            </p>
            <p className="text-brand-yellow font-semibold text-sm italic">
              &ldquo;{brand.tagline}&rdquo;
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Servicios", href: "/#servicios" },
                { label: "Horarios", href: "/#horarios" },
                { label: "Testimonios", href: "/#testimonios" },
                { label: "Promociones", href: "/#promociones" },
                { label: "Generador IA", href: "/generador" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-brand-yellow mt-0.5">📍</span>
                <span className="text-gray-400 text-sm">{brand.contact.addressFull}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-yellow">📱</span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {brand.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-yellow">📧</span>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-brand-yellow">📸</span>
                <a
                  href={brand.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {brand.contact.instagram}
                </a>
              </li>
            </ul>

            {/* Hours */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Horarios
              </h4>
              <ul className="space-y-1">
                {brand.hours.map((h) => (
                  <li key={h.days} className="text-gray-400 text-xs">
                    <span className="text-gray-300">{h.days}:</span> {h.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-whatsapp/10 border border-whatsapp/30 text-whatsapp px-4 py-2 rounded-lg text-xs font-semibold hover:bg-whatsapp hover:text-white transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribinos ahora
          </a>
        </div>
      </div>
    </footer>
  );
}
