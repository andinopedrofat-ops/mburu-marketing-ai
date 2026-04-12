// ============================================================
// MBURU MARKETING AI — Instagram Content Generator
// Template-based engine. All outputs in Spanish.
// Produces: Reel ideas, Carousel ideas, Hooks, Captions, CTAs
// ============================================================

export interface GeneratorInput {
  topic: string;       // Tema del contenido
  objective: string;   // Objetivo del post
  audience: string;    // Audiencia objetivo
  format: string;      // Formato preferido
}

export interface ReelIdea {
  title: string;
  hook: string;
  scenes: string[];
  visualNotes: string;
  music: string;
}

export interface CarouselIdea {
  title: string;
  swipeText: string;
  slides: string[];
}

export interface GeneratedContent {
  reelIdeas: ReelIdea[];
  carouselIdeas: CarouselIdea[];
  hooks: string[];
  captions: string[];
  ctas: string[];
}

// Deterministic hash for varied-but-consistent template selection
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number, offset = 0): T {
  return arr[(seed + offset) % arr.length];
}

// ── HOOK TEMPLATES ──────────────────────────────────────────
function buildHooks(topic: string, audience: string, seed: number): string[] {
  const all = [
    `Si sos de los que dicen "mañana arranco"... este post es para vos.`,
    `Lo que nadie te dice sobre ${topic}.`,
    `${audience}: lo que te falta no es fuerza de voluntad.`,
    `Paré de esperar estar listo. Esto pasó después.`,
    `¿Cuánto tiempo más vas a esperar para empezar con ${topic}?`,
    `El gym no es lo que creés. Especialmente si sos ${audience}.`,
    `No fue la dieta. No fue el suplemento. Fue esto.`,
    `La verdad incómoda sobre ${topic} que nadie quiere escuchar.`,
    `Un mes después de empezar: esto es lo que nadie me contó.`,
    `¿Por qué ${audience} abandona el gym antes de los 30 días?`,
    `Tres cosas que desearía saber antes de empezar ${topic}.`,
    `Esto es lo único que te separa de quien querés ser.`,
    `No es motivación lo que necesitás. Es el entorno correcto.`,
    `Dejá de creer este mito sobre ${topic}.`,
    `El cambio que buscás empieza con una decisión de 30 segundos.`,
  ];
  return [
    pick(all, seed, 0),
    pick(all, seed, 4),
    pick(all, seed, 8),
  ];
}

// ── CAPTION TEMPLATES ───────────────────────────────────────
function buildCaptions(
  topic: string,
  audience: string,
  objective: string,
  seed: number
): string[] {
  const all = [
    `${topic}.\n\nNo es fácil. No va a ser perfecto.\nPero es necesario.\n\nCada día que esperás, el costo sube.\n\nEn Mburucuya te esperamos. El primer paso es gratis.\n💪\n\n#MburucuyaFitness #TransformacionReal #EmpezarEsElCamino #GimnasioMburucuya`,

    `Para ${audience} que siente que no puede:\n\nPodés.\n\nEl problema no sos vos.\nEs el entorno.\n\nEn Mburucuya creamos el entorno que necesitás para ${objective}.\n\nPrimera clase: gratis. Sin excusas.\n🔥\n\n#MburucuyaFitness #NoEsMotivacion #EsElEntorno #CambioReal`,

    `Tres meses atrás no podía ni imaginarlo.\n\nHoy, ${topic} es parte de mi vida.\n\nNo cambié de golpe.\nCambié de entorno.\n\nMburucuya — donde los cambios son reales.\n\nReservá tu clase gratis. 👇\n\n#MburucuyaFitness #CambioDeVida #EmpezarHoy`,

    `Esto es para ${audience}:\n\nSabés que necesitás empezar.\nSabés que ${topic} te haría bien.\nSabés que llevás meses postergándolo.\n\nTambién sé que tenés miedo de empezar y volver a abandonar.\n\nPor eso existe Mburucuya.\nPara acompañarte desde el primer día.\n\n💛 Primera clase gratis.\n\n#MburucuyaFitness #SinExcusas #Comunidad #EmpezarEsValiente`,

    `El objetivo era ${objective}.\n\nLo que conseguí además:\n→ Energía para todo el día\n→ Mejor sueño\n→ Más confianza\n→ Una comunidad que impulsa\n\n${topic} cambió más que mi cuerpo.\n\nEmpezá hoy. Primera clase gratis en Mburucuya. 🙌\n\n#MburucuyaFitness #ResultadosReales #MasQueUnGym`,

    `La persona que eras hace un año te está observando.\n\n¿Qué ve?\n\nSi la respuesta te incomoda, ese malestar es información.\n\nUsa esa incomodidad.\nTransformala en movimiento.\n\nEn Mburucuya te acompañamos desde el primer paso hasta el que ni imaginás todavía.\n\nEscribinos hoy. 🔥\n\n#MburucuyaFitness #TransformacionPersonal #${topic.replace(/\s+/g, "")}`,
  ];

  return [
    pick(all, seed, 0),
    pick(all, seed, 2),
    pick(all, seed, 4),
  ];
}

// ── CTA TEMPLATES ───────────────────────────────────────────
function buildCTAs(seed: number): string[] {
  const all = [
    `Escribinos por WhatsApp y reservá tu clase gratis hoy: 0992 446 377`,
    `Tu primera clase en Mburucuya es gratis. Mandanos un mensaje y lo organizamos.`,
    `¿Listo para empezar? Escribinos y reservamos tu lugar HOY: 0992 446 377`,
    `Primera clase GRATIS. Sin excusas. Solo escribinos: 0992 446 377`,
    `Guardá este post. Cuando estés listo, escribinos. Te esperamos: 0992 446 377`,
    `DM o WhatsApp: reservá tu clase gratis en Mburucuya ahora. 0992 446 377`,
    `No lo pienses más. Escribinos hoy y empezás mañana mismo: 0992 446 377`,
    `Tu primer entrenamiento es gratis. Escribinos y lo organizamos juntos: 0992 446 377`,
    `Un mensaje. Una decisión. Empezamos juntos: 0992 446 377`,
  ];
  return [
    pick(all, seed, 0),
    pick(all, seed, 3),
    pick(all, seed, 6),
  ];
}

// ── REEL IDEA TEMPLATES ─────────────────────────────────────
function buildReelIdeas(
  topic: string,
  audience: string,
  objective: string,
  seed: number
): ReelIdea[] {
  const templates: ReelIdea[] = [
    {
      title: `"Mañana arranco" — El reel que para el scroll`,
      hook: `Texto en pantalla negra: "Llevo 6 meses diciendo mañana arranco."`,
      scenes: [
        `Escena 1 (0–3s): Pantalla negra. Texto bold blanco: "Llevo 6 meses diciendo mañana arranco."`,
        `Escena 2 (3–8s): ${audience} en sillón, scrolleando el teléfono. Reloj en la pared: 22:00.`,
        `Escena 3 (8–15s): Cortes rápidos — misma persona días después. Atándose los cordones. Entrando a Mburucuya. Levantando. Sonriendo.`,
        `Escena 4 (15–22s): Mira directo a cámara. Overlay: "El mañana que esperaba era hoy."`,
        `Escena 5 (22–28s): Fundido a logo Mburucuya + CTA: "Tu primera clase es gratis."`,
      ],
      visualNotes:
        "Filmado en celular. Escena 1–2: warm, desaturado. Escenas del gym: alto contraste, vívido. Transición marcada por cambio musical.",
      music:
        "Lo-fi melancólico en escenas 1–2, corte a beat motivacional en escena 3.",
    },
    {
      title: `Las 3 excusas que usa ${audience} para no entrenar`,
      hook: `"Estas son las 3 excusas que uso para no ir al gym. Y la respuesta a cada una."`,
      scenes: [
        `Escena 1 (0–3s): Creator mirando a cámara: "Estas son las 3 excusas que uso para no ir al gym."`,
        `Escena 2 (3–8s): Excusa 1: "No tengo tiempo." — texto overlay. Respuesta: "Tengo 168 horas por semana."`,
        `Escena 3 (8–14s): Excusa 2: "Estoy muy cansado/a." — texto overlay. Respuesta: "El gym me da energía, no me la saca."`,
        `Escena 4 (14–20s): Excusa 3: "No sé hacer los ejercicios." — texto overlay. Respuesta: "Para eso están los profes de Mburucuya."`,
        `Escena 5 (20–28s): "¿Cuál es tu excusa?" — directo a cámara. Fundido a logo + CTA.`,
      ],
      visualNotes:
        "Estilo talking head + text cards. Rápido, rítmico. Texto grande que aparece sincronizado con la voz.",
      music: "Música de fondo energética pero no distrae. El foco es la voz.",
    },
    {
      title: `Un día real en Mburucuya — Sin filtros`,
      hook: `"Esto es lo que nadie te muestra del gym."`,
      scenes: [
        `Escena 1 (0–4s): POV llegando al gym — puerta, recepción, caras conocidas que saludan.`,
        `Escena 2 (4–12s): Distintos momentos del entrenamiento — esfuerzo real, risas, sudor, ayuda entre miembros.`,
        `Escena 3 (12–18s): Close up de alguien terminando su serie. Respira fuerte. Cara de satisfacción total.`,
        `Escena 4 (18–25s): Overlay: "Así se siente elegirte a vos mismo/a. Todos los días."`,
        `Escena 5 (25–30s): Logo + CTA hacia WhatsApp.`,
      ],
      visualNotes:
        "Filmación documental, sin actuar. La autenticidad es el valor. Luz natural del gym. Cero filtros de belleza.",
      music: "Energética y positiva. Electronic pop o hip-hop limpio.",
    },
    {
      title: `Antes vs. Después — No el cuerpo, la actitud`,
      hook: `"El cambio más grande no fue el cuerpo."`,
      scenes: [
        `Escena 1 (0–3s): Texto: "El cambio más grande no fue el cuerpo."`,
        `Escena 2 (3–10s): Split screen — antes: ${audience} agotado/a, sin energía. Después: misma persona, diferente energía.`,
        `Escena 3 (10–18s): Lista en overlay: "→ Duermo mejor. → Tengo más paciencia. → Me miro distinto/a al espejo."`,
        `Escena 4 (18–25s): Testimonio directo: "El gym me devolvió confianza, no solo forma física."`,
        `Escena 5 (25–30s): Mburucuya logo + "Tu transformación empieza hoy."`,
      ],
      visualNotes:
        "Colores cálidos. El split screen debe mostrar la ACTITUD, no solo la apariencia. Usa texto para guiar la narrativa.",
      music: "Emocional y suave al principio, sube gradualmente.",
    },
    {
      title: `El primer día siempre da miedo — Y está bien`,
      hook: `"Todos tienen miedo el primer día. Todos."`,
      scenes: [
        `Escena 1 (0–4s): Persona parada en la puerta del gym, dudando. Voz en off: "Todos tienen miedo el primer día."`,
        `Escena 2 (4–10s): Flash de distintas personas — todas nerviosas al entrar por primera vez.`,
        `Escena 3 (10–18s): Las mismas personas semanas después — riendo, saludando, confiadas.`,
        `Escena 4 (18–25s): Texto: "El miedo dura 5 minutos. El orgullo dura toda la semana."`,
        `Escena 5 (25–30s): CTA: "Primera clase gratis. Sin presión."`,
      ],
      visualNotes:
        "Empezá con toma lenta, dramática. El giro emocional en escena 3 debe sentirse genuino. Usa música para acentuar el cambio.",
      music:
        "Intro: música tensa pero suave. Escena 3: sube con energía y esperanza.",
    },
    {
      title: `${topic} — Lo que no te dijeron`,
      hook: `"Sobre ${topic}, te mintieron en esto."`,
      scenes: [
        `Escena 1 (0–3s): Texto: "Sobre ${topic}, nadie te dijo esto."`,
        `Escena 2 (3–9s): Mito #1 con texto overlay — refutado en 2 segundos.`,
        `Escena 3 (9–15s): Mito #2 con texto overlay — refutado en 2 segundos.`,
        `Escena 4 (15–21s): Mito #3 con texto overlay — refutado en 2 segundos.`,
        `Escena 5 (21–28s): "La verdad: ${objective} es posible para vos. En Mburucuya lo hacemos juntos."`,
        `Escena 6 (28–30s): Logo + CTA.`,
      ],
      visualNotes:
        "Estilo rápido y educativo. Texto aparece rápido. Cada mito con un color diferente (rojo) y la respuesta en verde o amarillo.",
      music: "Beat constante, rápido. Que marque el ritmo de los cortes.",
    },
  ];

  const s = seed % templates.length;
  return [
    templates[s],
    templates[(s + 2) % templates.length],
    templates[(s + 4) % templates.length],
  ];
}

// ── CAROUSEL IDEA TEMPLATES ─────────────────────────────────
function buildCarouselIdeas(
  topic: string,
  audience: string,
  objective: string,
  seed: number
): CarouselIdea[] {
  const templates: CarouselIdea[] = [
    {
      title: `Por qué ${audience} abandona el gym (y cómo evitarlo)`,
      swipeText: `Swipeá para entender por qué antes no funcionó 👉`,
      slides: [
        `Slide 1 (HOOK): "Por qué ${audience} abandona antes de ver resultados." — fondo negro, texto blanco bold, tipografía grande.`,
        `Slide 2: "Razón #1: Entrás sin un plan." — Solución: En Mburucuya tenés profes que te guían desde el día 1.`,
        `Slide 3: "Razón #2: El ambiente no ayuda." — Solución: Comunidad que te empuja, no que te juzga.`,
        `Slide 4: "Razón #3: Esperás resultados en 2 semanas." — Solución: Te enseñamos a medir el progreso real.`,
        `Slide 5: "Razón #4: No tenés a quién rendirle cuentas." — Solución: Tu entrenador te conoce por nombre.`,
        `Slide 6 (CTA): "Mburucuya es diferente. Primera clase gratis — escribinos: 0992 446 377" — color de marca, logo visible.`,
      ],
    },
    {
      title: `${topic} en 5 pasos para ${audience} que empieza de cero`,
      swipeText: `El paso 1 es el único que importa hoy. Swipeá 👉`,
      slides: [
        `Slide 1 (HOOK): "Cómo empezar ${topic} aunque nunca hayas pisado un gym." — tipografía impactante.`,
        `Slide 2: "Paso 1: Decidir — El más difícil y el más importante. Solo se decide una vez."`,
        `Slide 3: "Paso 2: Aparecer — Aunque no tengas ganas. Especialmente cuando no tengas ganas."`,
        `Slide 4: "Paso 3: Confiar en el proceso — Los primeros 21 días no vas a sentir nada. Seguí igual."`,
        `Slide 5: "Paso 4: Construir el hábito — La semana 4 cambia todo. El gym deja de ser un esfuerzo."`,
        `Slide 6: "Paso 5: No parar — Porque ya sabés cómo se siente el otro lado."`,
        `Slide 7 (CTA): "Mburucuya te acompaña en cada paso. Primera clase gratis." — logo + número.`,
      ],
    },
    {
      title: `Las mentiras que te contaron sobre ${topic}`,
      swipeText: `¿Cuántas de estas creíste? Swipeá para descubrir 👉`,
      slides: [
        `Slide 1 (HOOK): "Te mintieron sobre ${topic}." — fondo rojo, texto blanco, impactante.`,
        `Slide 2: "Mentira #1: Necesitás motivación para empezar." — Verdad: La motivación viene después de empezar, no antes.`,
        `Slide 3: "Mentira #2: Tenés que estar en forma para ir al gym." — Verdad: El gym es exactamente el lugar donde ponerse en forma.`,
        `Slide 4: "Mentira #3: Si no duele, no funciona." — Verdad: La consistencia gana. Siempre.`,
        `Slide 5: "Mentira #4: Tenés que cambiar todo tu estilo de vida." — Verdad: Un hábito a la vez construye la transformación.`,
        `Slide 6 (VERDAD): "Lo que sí necesitás: el entorno correcto. Ese es Mburucuya."`,
        `Slide 7 (CTA): "Primera clase gratis. Sin mentiras. Solo resultados." — logo + WhatsApp.`,
      ],
    },
    {
      title: `${objective}: lo que nadie te dice que vas a ganar también`,
      swipeText: `Esto cambia todo. Swipeá 👉`,
      slides: [
        `Slide 1 (HOOK): "Empezaste por ${objective}. Esto es lo que ganaste también." — diseño limpio.`,
        `Slide 2: "Dormís mejor. — 73% de nuestros miembros reportan mejor calidad de sueño en el primer mes."`,
        `Slide 3: "Tenés más paciencia. — El ejercicio regula el cortisol. Sos más vos."`,
        `Slide 4: "Tu confianza cambia. — No es vanidad. Es el resultado de cumplirte promesas a vos mismo/a."`,
        `Slide 5: "Encontraste una comunidad. — Personas que se impulsan entre sí. Sin competencia, con apoyo."`,
        `Slide 6: "El gym te devolvió tiempo mental. — Cuando entrenás, pensás mejor. Rendís más en todo."`,
        `Slide 7 (CTA): "Todo esto está esperándote en Mburucuya. Primera clase gratis." — logo.`,
      ],
    },
    {
      title: `Horario de entrenamiento para ${audience} que dice que no tiene tiempo`,
      swipeText: `168 horas por semana. Swipeá 👉`,
      slides: [
        `Slide 1 (HOOK): "Para ${audience} que dice 'no tengo tiempo para entrenar'." — texto directo.`,
        `Slide 2: "Tenés 168 horas por semana. El entrenamiento te pide 3–4 horas." — con visual de reloj.`,
        `Slide 3: "Un entrenamiento de 45 min equivale al 0.4% de tu semana." — dato visual impactante.`,
        `Slide 4: "Entrenando 3 veces por semana ganás: + energía, + foco, + calidad de sueño." — lista visual.`,
        `Slide 5: "El tiempo que 'no tenés' lo perdés en fatiga, mal humor y baja productividad." — honestidad radical.`,
        `Slide 6: "Mburucuya tiene clases en horarios que se adaptan a vos: 6am a 10pm." — horarios reales.`,
        `Slide 7 (CTA): "¿Cuándo podés venir? Escribinos y armamos tu plan: 0992 446 377."`,
      ],
    },
    {
      title: `Testimonio real: de ${audience} a transformación en Mburucuya`,
      swipeText: `Historia real. Swipeá para leerla 👉`,
      slides: [
        `Slide 1 (HOOK): "Llevaba 2 años diciendo que iba a empezar. Esto pasó cuando finalmente lo hice." — foto o texto.`,
        `Slide 2: "Semana 1: Todo dolía. No sabía nada. Quise rendirme." — honestidad total.`,
        `Slide 3: "Semana 2–3: Empecé a conocer a la gente. Los profes me conocían por nombre." — conexión.`,
        `Slide 4: "Mes 1: No vi cambios en el espejo. Pero dormía diferente. Me levantaba diferente." — progreso invisible.`,
        `Slide 5: "Mes 2–3: El espejo empezó a cambiar. Pero ya no me importaba tanto." — el giro.`,
        `Slide 6: "Hoy no voy al gym porque tengo que. Voy porque lo necesito." — identidad transformada.`,
        `Slide 7 (CTA): "Tu historia puede ser esta. Primera clase gratis en Mburucuya: 0992 446 377."`,
      ],
    },
  ];

  const s = seed % templates.length;
  return [
    templates[s],
    templates[(s + 2) % templates.length],
    templates[(s + 4) % templates.length],
  ];
}

// ── MAIN GENERATOR FUNCTION ─────────────────────────────────
export function generateContent(input: GeneratorInput): GeneratedContent {
  const seed = hash(
    `${input.topic}|${input.objective}|${input.audience}|${input.format}`
  );

  return {
    reelIdeas: buildReelIdeas(input.topic, input.audience, input.objective, seed),
    carouselIdeas: buildCarouselIdeas(input.topic, input.audience, input.objective, seed),
    hooks: buildHooks(input.topic, input.audience, seed),
    captions: buildCaptions(input.topic, input.audience, input.objective, seed),
    ctas: buildCTAs(seed),
  };
}
