// ============================================================
// MBURU MARKETING AI — Brand Configuration
// Edit this file to update all website content and settings.
// No coding knowledge required — just update the values below.
// ============================================================

export const brand = {
  // ── IDENTITY ──────────────────────────────────────────────
  name: "Mburucuya Fitness Center",
  shortName: "MBURU",
  tagline: "No es motivación. Es el entorno.",
  slogan: "El lugar donde te convertís en quien querés ser.",
  description:
    "Mburucuya Fitness Center es más que un gym. Es la comunidad que te hace volver. Entrenamiento real para personas reales.",

  // ── CONTACT & SOCIAL ──────────────────────────────────────
  whatsapp: {
    number: "595992446377", // International format, no spaces or +
    displayNumber: "0992 446 377",
    defaultMessage:
      "Hola! Me gustaría reservar mi clase gratuita en Mburucuya Fitness Center.",
    // Generates the full WhatsApp URL automatically
    url: "https://wa.me/595992446377",
  },

  contact: {
    phone: "0992 446 377",
    email: "info@mburucuyafitness.com",
    address: "Asunción, Paraguay",
    addressFull: "Av. Principal 1234, Asunción, Paraguay",
    instagram: "@mburucuyafitness",
    instagramUrl: "https://instagram.com/mburucuyafitness",
    googleMapsUrl: "https://maps.google.com",
  },

  // ── STATS (shown in Hero) ──────────────────────────────────
  stats: [
    { value: "500+", label: "Miembros activos" },
    { value: "12+", label: "Clases por semana" },
    { value: "5", label: "Entrenadores certificados" },
    { value: "3", label: "Años transformando vidas" },
  ],

  // ── SERVICES ──────────────────────────────────────────────
  services: [
    {
      name: "Musculación",
      description:
        "Equipamiento completo para tu entrenamiento de fuerza. Progresá a tu ritmo con guía profesional.",
      icon: "💪",
      highlight: false,
    },
    {
      name: "Clases Grupales",
      description:
        "Cardio, funcional, zumba y más. El entrenamiento en grupo que te hace querer volver cada día.",
      icon: "🔥",
      highlight: true, // This card gets special styling
    },
    {
      name: "Entrenamiento Personal",
      description:
        "Plan personalizado con seguimiento semanal. Para los que van en serio con sus resultados.",
      icon: "🎯",
      highlight: false,
    },
    {
      name: "Asesoramiento Nutricional",
      description:
        "Nutrición integrada a tu rutina. Sin dietas locas, solo estrategia y resultados sostenibles.",
      icon: "🥗",
      highlight: false,
    },
    {
      name: "Zona Cardio",
      description:
        "Cintas, bikes, elípticas. Tu ritmo, tu meta. Cardio que realmente quema.",
      icon: "⚡",
      highlight: false,
    },
    {
      name: "Primera Clase Gratis",
      description:
        "¿No sabés si es para vos? Vení a probar. Sin compromiso, sin costo. Solo traé ganas.",
      icon: "🎁",
      highlight: true,
    },
  ],

  // ── SCHEDULE ──────────────────────────────────────────────
  schedule: [
    {
      day: "Lunes",
      shortDay: "LUN",
      classes: [
        { time: "06:00", name: "Funcional Matutino", trainer: "Prof. Carlos", duration: "45min" },
        { time: "09:00", name: "Musculación Libre", trainer: "", duration: "Libre" },
        { time: "18:00", name: "Cardio + Core", trainer: "Prof. Ana", duration: "50min" },
        { time: "20:00", name: "Funcional Nocturno", trainer: "Prof. Carlos", duration: "45min" },
      ],
    },
    {
      day: "Martes",
      shortDay: "MAR",
      classes: [
        { time: "07:00", name: "Yoga Flow", trainer: "Prof. Laura", duration: "60min" },
        { time: "09:00", name: "Musculación Libre", trainer: "", duration: "Libre" },
        { time: "18:30", name: "Zumba", trainer: "Prof. María", duration: "50min" },
        { time: "19:30", name: "Funcional Intenso", trainer: "Prof. Carlos", duration: "45min" },
      ],
    },
    {
      day: "Miércoles",
      shortDay: "MIÉ",
      classes: [
        { time: "06:00", name: "Funcional Matutino", trainer: "Prof. Carlos", duration: "45min" },
        { time: "09:00", name: "Musculación Libre", trainer: "", duration: "Libre" },
        { time: "18:00", name: "Cardio + Core", trainer: "Prof. Ana", duration: "50min" },
        { time: "20:00", name: "Boxeo Fitness", trainer: "Prof. Diego", duration: "45min" },
      ],
    },
    {
      day: "Jueves",
      shortDay: "JUE",
      classes: [
        { time: "07:00", name: "Yoga Flow", trainer: "Prof. Laura", duration: "60min" },
        { time: "09:00", name: "Musculación Libre", trainer: "", duration: "Libre" },
        { time: "18:30", name: "Zumba", trainer: "Prof. María", duration: "50min" },
        { time: "19:30", name: "Funcional Intenso", trainer: "Prof. Carlos", duration: "45min" },
      ],
    },
    {
      day: "Viernes",
      shortDay: "VIE",
      classes: [
        { time: "06:00", name: "Full Body", trainer: "Prof. Ana", duration: "50min" },
        { time: "09:00", name: "Musculación Libre", trainer: "", duration: "Libre" },
        { time: "18:00", name: "Zumba Viernes", trainer: "Prof. María", duration: "50min" },
        { time: "19:30", name: "Cardio Blast", trainer: "Prof. Carlos", duration: "40min" },
      ],
    },
    {
      day: "Sábado",
      shortDay: "SÁB",
      classes: [
        { time: "08:00", name: "Funcional Grupal", trainer: "Prof. Carlos", duration: "50min" },
        { time: "09:30", name: "Zumba Weekend", trainer: "Prof. María", duration: "50min" },
        { time: "11:00", name: "Musculación Libre", trainer: "", duration: "Libre" },
      ],
    },
  ],

  // ── TESTIMONIALS ──────────────────────────────────────────
  testimonials: [
    {
      name: "Ana G.",
      result: "Bajó 12kg en 4 meses",
      text: "Llegué sin saber nada. Salí con energía que no tenía hace años. No es solo un gym, es otra cosa completamente.",
      weeks: 16,
      avatar: "AG",
    },
    {
      name: "Rodrigo M.",
      result: "Ganó 8kg de músculo",
      text: "Había probado 3 gimnasios antes. En Mburucuya encontré el ambiente que me hacía falta para no abandonar nunca más.",
      weeks: 24,
      avatar: "RM",
    },
    {
      name: "Valentina P.",
      result: "Duerme mejor, tiene más energía",
      text: "Empecé por la insistencia de una amiga. A las 2 semanas ya era mi momento favorito del día. En serio, no lo esperaba.",
      weeks: 8,
      avatar: "VP",
    },
    {
      name: "Matías R.",
      result: "Bajó 20kg en 7 meses",
      text: "Pensaba que el gym era para los que ya están fit. Acá entendí que el gym es exactamente para los que no lo están todavía.",
      weeks: 28,
      avatar: "MR",
    },
  ],

  // ── PROMOTIONS ────────────────────────────────────────────
  promotions: [
    {
      title: "Primera Clase Gratis",
      description:
        "Vení a conocernos sin costo y sin compromiso. Solo traé ganas y ropa cómoda.",
      badge: "SIEMPRE ACTIVA",
      badgeColor: "yellow",
      highlight: true, // Featured promotion
      cta: "Reservar Mi Clase Gratis",
      whatsappMessage:
        "Hola! Quiero reservar mi primera clase gratuita en Mburucuya.",
    },
    {
      title: "Matrícula $0",
      description:
        "Este mes te olvidás de la matrícula. Solo pagás tu cuota mensual y empezás a transformarte.",
      badge: "TIEMPO LIMITADO",
      badgeColor: "blue",
      highlight: false,
      cta: "Quiero Esta Promo",
      whatsappMessage:
        "Hola! Me interesa la promo de matrícula gratis. ¿Sigue disponible?",
    },
    {
      title: "Trae un Amigo",
      description:
        "Traé un amigo y los dos entrenan el primer mes a mitad de precio. Mejor juntos.",
      badge: "PROMO DÚO",
      badgeColor: "green",
      highlight: false,
      cta: "Ver Detalles",
      whatsappMessage:
        "Hola! Quiero información sobre la promo Trae un Amigo.",
    },
  ],

  // ── OPENING HOURS ─────────────────────────────────────────
  hours: [
    { days: "Lunes a Viernes", time: "06:00 – 22:00" },
    { days: "Sábados", time: "08:00 – 14:00" },
    { days: "Domingos y Feriados", time: "Cerrado" },
  ],
};

export type Brand = typeof brand;
