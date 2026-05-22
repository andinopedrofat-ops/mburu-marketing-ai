"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EXERCISES = [
  {
    id: "breathing",
    emoji: "🌬️",
    title: "Respiración",
    subtitle: "Calmá la mente",
    color: "#4a90d9",
    bg: "#e8f4fd",
    duration: "3 min",
    stars: 1,
  },
  {
    id: "colors",
    emoji: "🎨",
    title: "Colores",
    subtitle: "Identifica y empareja",
    color: "#ff7043",
    bg: "#fff3e0",
    duration: "4 min",
    stars: 1,
  },
  {
    id: "memory",
    emoji: "🧠",
    title: "Memoria",
    subtitle: "Encuentra los pares",
    color: "#9c6fde",
    bg: "#f3eaff",
    duration: "5 min",
    stars: 2,
  },
  {
    id: "movement",
    emoji: "🐸",
    title: "Movimiento",
    subtitle: "Imita los animales",
    color: "#4caf8c",
    bg: "#e8f5f0",
    duration: "4 min",
    stars: 1,
  },
  {
    id: "rhythm",
    emoji: "🎵",
    title: "Ritmo",
    subtitle: "Sigue el patrón",
    color: "#f06292",
    bg: "#fce4ec",
    duration: "3 min",
    stars: 2,
  },
  {
    id: "counting",
    emoji: "🔢",
    title: "Contar",
    subtitle: "Cuenta las estrellas",
    color: "#ffcc00",
    bg: "#fffde7",
    duration: "4 min",
    stars: 1,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [name, setName] = useState("Amigo");
  const [gender, setGender] = useState("boy");
  const [stars, setStars] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const n = localStorage.getItem("kidName");
    const g = localStorage.getItem("kidGender");
    const s = localStorage.getItem("kidStars");
    const c = localStorage.getItem("kidCompleted");
    if (!n) { router.push("/"); return; }
    if (n) setName(n);
    if (g) setGender(g);
    if (s) setStars(parseInt(s, 10));
    if (c) setCompleted(JSON.parse(c));
  }, [router]);

  const greeting = gender === "girl" ? `¡Hola, ${name}!` : `¡Hola, ${name}!`;
  const avatar = gender === "girl" ? "👧" : "👦";
  const totalStars = EXERCISES.reduce((a, e) => a + e.stars, 0);

  return (
    <main className="min-h-screen bg-[#f0f7f4] pb-8">
      {/* Header */}
      <div
        className="w-full px-5 pt-8 pb-6"
        style={{
          background: "linear-gradient(135deg, #1a2744, #2d4a8a)",
          borderRadius: "0 0 28px 28px",
        }}
      >
        <div className="max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm font-medium mb-1">CerebritoActivo</p>
              <h2 className="text-white font-extrabold text-2xl">{greeting} {avatar}</h2>
              <p className="text-white/60 text-sm mt-1">¿Qué ejercicio hacemos hoy?</p>
            </div>
            <div className="text-right">
              <div
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl"
                style={{ background: "rgba(255,204,0,0.2)" }}
              >
                <span className="text-lg">⭐</span>
                <span className="text-[#ffcc00] font-bold text-lg">{stars}</span>
                <span className="text-white/50 text-xs">/{totalStars}</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${totalStars > 0 ? (stars / totalStars) * 100 : 0}%`,
                background: "linear-gradient(90deg, #ffcc00, #ff9800)",
              }}
            />
          </div>
          <p className="text-white/50 text-xs mt-1 text-right">
            {completed.length}/{EXERCISES.length} completados
          </p>
        </div>
      </div>

      {/* Exercises grid */}
      <div className="max-w-sm mx-auto px-4 mt-6">
        <p className="text-[#1a2744] font-bold text-base mb-4">
          Ejercicios de hoy 🌟
        </p>

        <div className="grid grid-cols-2 gap-3">
          {EXERCISES.map((ex, i) => {
            const isDone = completed.includes(ex.id);
            return (
              <Link
                key={ex.id}
                href={`/exercises/${ex.id}`}
                className="card-hover rounded-2xl overflow-hidden"
                style={{
                  background: isDone ? "#e8f5f0" : ex.bg,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                  animationDelay: `${i * 0.08}s`,
                  opacity: 0,
                  animation: `fadeIn 0.5s ease ${i * 0.08}s forwards`,
                }}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-4xl">{ex.emoji}</span>
                    {isDone && (
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                        style={{ background: "#4caf8c" }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <h3
                    className="font-bold text-[#1a2744] text-sm leading-tight"
                  >
                    {ex.title}
                  </h3>
                  <p className="text-gray-500 text-xs mt-0.5">{ex.subtitle}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-400">⏱ {ex.duration}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: ex.stars }).map((_, j) => (
                        <span key={j} className="text-sm">
                          {isDone ? "⭐" : "☆"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className="h-1.5"
                  style={{
                    background: isDone
                      ? "#4caf8c"
                      : `linear-gradient(90deg, ${ex.color}40, ${ex.color})`,
                  }}
                />
              </Link>
            );
          })}
        </div>

        {/* Motivational message */}
        <div
          className="mt-5 rounded-2xl p-4 text-center fade-in"
          style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          {completed.length === 0 && (
            <p className="text-[#1a2744] text-sm font-medium">
              🚀 ¡Elegí un ejercicio para empezar la aventura!
            </p>
          )}
          {completed.length > 0 && completed.length < EXERCISES.length && (
            <p className="text-[#1a2744] text-sm font-medium">
              🌟 ¡Genial! Completaste {completed.length} de {EXERCISES.length}.{" "}
              <span className="text-[#4caf8c]">¡Seguí así!</span>
            </p>
          )}
          {completed.length === EXERCISES.length && (
            <p className="text-[#1a2744] text-sm font-bold">
              🏆 ¡Increíble! ¡Completaste todos los ejercicios del día!
            </p>
          )}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="w-full text-center text-gray-400 text-xs mt-4 py-2 hover:text-gray-600 transition-colors"
        >
          Cambiar de perfil
        </button>
      </div>
    </main>
  );
}
