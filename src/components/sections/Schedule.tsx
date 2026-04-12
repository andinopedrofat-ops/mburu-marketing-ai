"use client";

import { useState } from "react";
import { brand } from "@/config/brand";

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(0);
  const day = brand.schedule[activeDay];
  const whatsappUrl = `${brand.whatsapp.url}?text=${encodeURIComponent("Hola! Quiero saber más sobre las clases y horarios de Mburucuya.")}`;

  return (
    <section id="horarios" className="py-20 md:py-28 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-brand-yellow text-sm font-semibold uppercase tracking-widest">
            Horarios
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white leading-tight">
            Encontrá tu momento.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-light to-brand-blue-mid">
              Hay clases para todos.
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
            De lunes a sábado, con horarios que se adaptan a tu vida.
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {brand.schedule.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeDay === i
                  ? "bg-brand-yellow text-brand-dark scale-105 shadow-lg shadow-brand-yellow/20"
                  : "bg-brand-card border border-brand-border text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="hidden sm:block">{d.day}</span>
              <span className="sm:hidden">{d.shortDay}</span>
            </button>
          ))}
        </div>

        {/* Classes list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {day.classes.map((cls, i) => (
            <div
              key={i}
              className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-yellow/30 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-brand-yellow font-black text-xl">{cls.time}</span>
                <span className="text-xs text-gray-500 bg-brand-dark px-2 py-1 rounded-full">
                  {cls.duration}
                </span>
              </div>
              <h3 className="text-white font-bold text-base group-hover:text-brand-yellow transition-colors">
                {cls.name}
              </h3>
              {cls.trainer && (
                <p className="mt-1 text-gray-500 text-sm flex items-center gap-1">
                  <span>👤</span>
                  {cls.trainer}
                </p>
              )}
              {!cls.trainer && (
                <p className="mt-1 text-gray-600 text-sm italic">Acceso libre</p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-brand-card border border-brand-border rounded-2xl p-8 text-center">
          <p className="text-white font-bold text-xl mb-2">
            ¿Querés reservar tu lugar en una clase?
          </p>
          <p className="text-gray-400 mb-6">
            Escribinos por WhatsApp y te confirmamos el cupo al instante.
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
            Reservar mi lugar
          </a>
        </div>
      </div>
    </section>
  );
}
