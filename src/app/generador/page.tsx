"use client";

import { useState } from "react";
import Link from "next/link";
import {
  generateContent,
  type GeneratorInput,
  type GeneratedContent,
  type ReelIdea,
  type CarouselIdea,
} from "@/lib/contentGenerator";
import { brand } from "@/config/brand";

// ── COPY BUTTON ──────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 ${
        copied
          ? "bg-whatsapp/20 text-whatsapp border border-whatsapp/30"
          : "bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:border-white/20"
      }`}
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copiado
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copiar
        </>
      )}
    </button>
  );
}

// ── CONTENT CARD ─────────────────────────────────────────────
function ContentCard({
  label,
  index,
  content,
}: {
  label: string;
  index: number;
  content: string;
}) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-yellow/20 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-brand-yellow text-xs font-black uppercase tracking-widest">
          {label} #{index + 1}
        </span>
        <CopyButton text={content} />
      </div>
      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

// ── REEL CARD ─────────────────────────────────────────────────
function ReelCard({ reel, index }: { reel: ReelIdea; index: number }) {
  const fullText = [
    `TÍTULO: ${reel.title}`,
    ``,
    `HOOK: ${reel.hook}`,
    ``,
    `ESCENAS:`,
    ...reel.scenes,
    ``,
    `NOTAS VISUALES: ${reel.visualNotes}`,
    ``,
    `MÚSICA: ${reel.music}`,
  ].join("\n");

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-yellow/20 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className="text-brand-yellow text-xs font-black uppercase tracking-widest">
          Idea Reel #{index + 1}
        </span>
        <CopyButton text={fullText} />
      </div>
      <h4 className="text-white font-bold text-base mb-3">{reel.title}</h4>
      <div className="space-y-3">
        <div className="bg-brand-dark/60 rounded-xl p-3">
          <div className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold mb-1">Hook</div>
          <p className="text-gray-300 text-sm">{reel.hook}</p>
        </div>
        <div className="bg-brand-dark/60 rounded-xl p-3">
          <div className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold mb-2">Escenas</div>
          <ul className="space-y-1.5">
            {reel.scenes.map((scene, i) => (
              <li key={i} className="text-gray-400 text-xs leading-relaxed flex gap-2">
                <span className="text-brand-yellow/60 flex-shrink-0">›</span>
                {scene}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3">
          <div className="bg-brand-dark/60 rounded-xl p-3 flex-1">
            <div className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold mb-1">Visual</div>
            <p className="text-gray-400 text-xs leading-relaxed">{reel.visualNotes}</p>
          </div>
          <div className="bg-brand-dark/60 rounded-xl p-3 flex-1">
            <div className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold mb-1">Música</div>
            <p className="text-gray-400 text-xs leading-relaxed">{reel.music}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CAROUSEL CARD ─────────────────────────────────────────────
function CarouselCard({ carousel, index }: { carousel: CarouselIdea; index: number }) {
  const fullText = [
    `TÍTULO: ${carousel.title}`,
    ``,
    `TEXTO DE SWIPE: ${carousel.swipeText}`,
    ``,
    `SLIDES:`,
    ...carousel.slides,
  ].join("\n");

  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-yellow/20 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className="text-brand-yellow text-xs font-black uppercase tracking-widest">
          Idea Carrusel #{index + 1}
        </span>
        <CopyButton text={fullText} />
      </div>
      <h4 className="text-white font-bold text-base mb-3">{carousel.title}</h4>
      <div className="space-y-3">
        <div className="bg-brand-dark/60 rounded-xl p-3">
          <div className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold mb-1">
            Texto para primer slide
          </div>
          <p className="text-brand-yellow text-sm font-medium">{carousel.swipeText}</p>
        </div>
        <div className="bg-brand-dark/60 rounded-xl p-3">
          <div className="text-gray-500 text-[11px] uppercase tracking-wider font-semibold mb-2">
            Slides ({carousel.slides.length})
          </div>
          <ul className="space-y-2">
            {carousel.slides.map((slide, i) => (
              <li key={i} className="text-gray-400 text-xs leading-relaxed flex gap-2">
                <span className="text-brand-yellow/60 flex-shrink-0 font-bold">{i + 1}.</span>
                {slide}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── SECTION WRAPPER ───────────────────────────────────────────
function ResultSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-white font-black text-xl">{title}</h3>
        <div className="flex-1 h-px bg-brand-border" />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────
const TOPICS = [
  "pereza para empezar",
  "transformación física",
  "falta de tiempo",
  "alimentación saludable",
  "miedo al gym",
  "primeros 30 días",
  "constancia y hábitos",
  "resultados reales",
];

const OBJECTIVES = [
  "generar leads de WhatsApp",
  "aumentar seguidores",
  "viralizar el contenido",
  "construir comunidad",
  "vender membresías",
  "mostrar resultados",
];

const AUDIENCES = [
  "mujeres 25–40 años",
  "hombres sedentarios",
  "personas que nunca fueron al gym",
  "mamás con poco tiempo",
  "jóvenes universitarios",
  "adultos 35–50 años",
];

const FORMATS = [
  "Reel",
  "Carrusel",
  "Story",
  "Todos los formatos",
];

export default function GeneradorPage() {
  const [input, setInput] = useState<GeneratorInput>({
    topic: "",
    objective: "",
    audience: "",
    format: "",
  });
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!input.topic || !input.objective || !input.audience) return;
    setLoading(true);
    // Simulate brief loading for UX
    setTimeout(() => {
      const result = generateContent(input);
      setContent(result);
      setLoading(false);
      // Scroll to results
      setTimeout(() => {
        document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 600);
  };

  const whatsappUrl = `${brand.whatsapp.url}?text=${encodeURIComponent(brand.whatsapp.defaultMessage)}`;

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      {/* Header */}
      <div className="border-b border-brand-border bg-brand-darker">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-6 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              Generador IA
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Contenido viral para
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-brand-yellow/60">
              Instagram en segundos.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Ingresá el tema, objetivo y audiencia. El sistema genera reels,
            carruseles, hooks, captions y CTAs listos para publicar — todo en
            español para Mburucuya.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Input Form */}
        <div className="bg-brand-card border border-brand-border rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <span>🎯</span>
            Configurá tu contenido
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Topic */}
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">
                Tema del contenido *
              </label>
              <input
                type="text"
                value={input.topic}
                onChange={(e) => setInput({ ...input, topic: e.target.value })}
                placeholder="ej: pereza para empezar, falta de tiempo..."
                className="w-full bg-brand-dark border border-brand-border hover:border-white/20 focus:border-brand-yellow text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
              {/* Quick picks */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {TOPICS.slice(0, 4).map((t) => (
                  <button
                    key={t}
                    onClick={() => setInput({ ...input, topic: t })}
                    className="text-[10px] text-gray-500 hover:text-brand-yellow border border-brand-border hover:border-brand-yellow/30 px-2 py-1 rounded-lg transition-colors"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Objective */}
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">
                Objetivo del post *
              </label>
              <input
                type="text"
                value={input.objective}
                onChange={(e) => setInput({ ...input, objective: e.target.value })}
                placeholder="ej: generar leads, viralizar, vender membresías..."
                className="w-full bg-brand-dark border border-brand-border hover:border-white/20 focus:border-brand-yellow text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {OBJECTIVES.slice(0, 3).map((o) => (
                  <button
                    key={o}
                    onClick={() => setInput({ ...input, objective: o })}
                    className="text-[10px] text-gray-500 hover:text-brand-yellow border border-brand-border hover:border-brand-yellow/30 px-2 py-1 rounded-lg transition-colors"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">
                Audiencia objetivo *
              </label>
              <input
                type="text"
                value={input.audience}
                onChange={(e) => setInput({ ...input, audience: e.target.value })}
                placeholder="ej: mujeres 25–40 años, hombres sedentarios..."
                className="w-full bg-brand-dark border border-brand-border hover:border-white/20 focus:border-brand-yellow text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {AUDIENCES.slice(0, 3).map((a) => (
                  <button
                    key={a}
                    onClick={() => setInput({ ...input, audience: a })}
                    className="text-[10px] text-gray-500 hover:text-brand-yellow border border-brand-border hover:border-brand-yellow/30 px-2 py-1 rounded-lg transition-colors"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-gray-400 text-sm font-semibold mb-2 uppercase tracking-wider">
                Formato preferido
              </label>
              <select
                value={input.format}
                onChange={(e) => setInput({ ...input, format: e.target.value })}
                className="w-full bg-brand-dark border border-brand-border hover:border-white/20 focus:border-brand-yellow text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="">Seleccioná un formato</option>
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate button */}
          <div className="mt-7">
            <button
              onClick={handleGenerate}
              disabled={!input.topic || !input.objective || !input.audience || loading}
              className="w-full flex items-center justify-center gap-3 bg-brand-yellow hover:bg-brand-yellow-hover disabled:opacity-40 disabled:cursor-not-allowed text-brand-dark px-8 py-4 rounded-2xl text-lg font-black transition-all duration-200 hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-yellow/20"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generando contenido...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generar contenido viral
                </>
              )}
            </button>
            <p className="text-center text-gray-600 text-xs mt-3">
              Genera 3 reels · 3 carruseles · 3 hooks · 3 captions · 3 CTAs
            </p>
          </div>
        </div>

        {/* Results */}
        {content && (
          <div id="resultados">
            {/* Results header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-white font-black text-2xl">Contenido generado</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Tema: <span className="text-gray-300">{input.topic}</span> ·{" "}
                  Audiencia: <span className="text-gray-300">{input.audience}</span>
                </p>
              </div>
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white border border-brand-border hover:border-white/20 px-4 py-2 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerar
              </button>
            </div>

            {/* Hooks */}
            <ResultSection title="Hooks Virales" icon="🔥">
              {content.hooks.map((hook, i) => (
                <ContentCard key={i} label="Hook" index={i} content={hook} />
              ))}
            </ResultSection>

            {/* Reel Ideas */}
            <ResultSection title="Ideas para Reels" icon="🎬">
              {content.reelIdeas.map((reel, i) => (
                <ReelCard key={i} reel={reel} index={i} />
              ))}
            </ResultSection>

            {/* Carousel Ideas */}
            <ResultSection title="Ideas para Carruseles" icon="🖼️">
              {content.carouselIdeas.map((carousel, i) => (
                <CarouselCard key={i} carousel={carousel} index={i} />
              ))}
            </ResultSection>

            {/* Captions */}
            <ResultSection title="Captions / Copies" icon="✍️">
              {content.captions.map((caption, i) => (
                <ContentCard key={i} label="Caption" index={i} content={caption} />
              ))}
            </ResultSection>

            {/* CTAs */}
            <ResultSection title="Llamados a la Acción (CTA)" icon="📲">
              {content.ctas.map((cta, i) => (
                <ContentCard key={i} label="CTA" index={i} content={cta} />
              ))}
            </ResultSection>

            {/* Bottom action */}
            <div className="mt-10 bg-gradient-to-r from-whatsapp/10 to-whatsapp/5 border border-whatsapp/20 rounded-2xl p-8 text-center">
              <p className="text-white font-bold text-xl mb-2">
                ¿Listos para publicar y generar leads?
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Publicá el contenido y derivá el tráfico directo a WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-whatsapp hover:bg-whatsapp-hover text-white px-8 py-4 rounded-2xl font-bold transition-all duration-200 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Abrir WhatsApp: {brand.whatsapp.displayNumber}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
