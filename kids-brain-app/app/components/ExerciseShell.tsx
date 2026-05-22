"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  title: string;
  emoji: string;
  color: string;
  stars: number;
  children: React.ReactNode;
  done: boolean;
  onReset: () => void;
}

function Confetti() {
  const colors = ["#ffcc00", "#4caf8c", "#4a90d9", "#f06292", "#ff7043", "#9c6fde"];
  const pieces = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="confetti-container" aria-hidden>
      {pieces.map((i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            background: colors[i % colors.length],
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            animationDuration: `${1.5 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ExerciseShell({
  id,
  title,
  emoji,
  color,
  stars,
  children,
  done,
  onReset,
}: Props) {
  const router = useRouter();
  const savedRef = useRef(false);

  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true;
      if (typeof window === "undefined") return;
      const completed: string[] = JSON.parse(localStorage.getItem("kidCompleted") ?? "[]");
      if (!completed.includes(id)) {
        completed.push(id);
        localStorage.setItem("kidCompleted", JSON.stringify(completed));
        const prev = parseInt(localStorage.getItem("kidStars") ?? "0", 10);
        localStorage.setItem("kidStars", String(prev + stars));
      }
    }
  }, [done, id, stars]);

  return (
    <main className="min-h-screen bg-[#f0f7f4] flex flex-col">
      {done && <Confetti />}

      {/* Top bar */}
      <div
        className="w-full px-4 py-4 flex items-center gap-3"
        style={{ background: color, borderRadius: "0 0 20px 20px" }}
      >
        <button
          onClick={() => router.push("/dashboard")}
          className="text-white/80 hover:text-white text-2xl font-bold leading-none btn-press"
          aria-label="Volver"
        >
          ←
        </button>
        <span className="text-2xl">{emoji}</span>
        <h1 className="text-white font-bold text-lg flex-1">{title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full px-4 pt-6">
        {!done ? (
          children
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center scale-in">
            <div className="text-8xl mb-4 float">🏆</div>
            <h2 className="text-3xl font-extrabold text-[#1a2744] mb-2">
              ¡Excelente!
            </h2>
            <p className="text-gray-500 text-base mb-5">
              Completaste el ejercicio de <strong>{title}</strong>
            </p>

            <div className="flex gap-2 mb-8">
              {Array.from({ length: stars }).map((_, i) => (
                <span
                  key={i}
                  className="text-4xl star-pop"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  ⭐
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={onReset}
                className="btn-press w-full py-4 rounded-2xl font-bold text-white text-base"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}cc)`,
                  boxShadow: `0 4px 16px ${color}40`,
                }}
              >
                🔄 Hacer de nuevo
              </button>
              <Link
                href="/dashboard"
                className="btn-press w-full py-4 rounded-2xl font-bold text-center text-[#1a2744] text-base"
                style={{ background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
              >
                🏠 Volver al inicio
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
