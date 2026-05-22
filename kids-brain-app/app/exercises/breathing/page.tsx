"use client";

import { useState, useEffect, useCallback } from "react";
import ExerciseShell from "@/app/components/ExerciseShell";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "done";

const ROUNDS = 4;

export default function BreathingExercise() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [round, setRound] = useState(0);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  const PHASES: { phase: Phase; label: string; duration: number; color: string; emoji: string }[] = [
    { phase: "inhale", label: "Respirá hondo...", duration: 4, color: "#4a90d9", emoji: "😮‍💨" },
    { phase: "hold", label: "Aguantá...", duration: 2, color: "#9c6fde", emoji: "🤐" },
    { phase: "exhale", label: "Soltá el aire...", duration: 4, color: "#4caf8c", emoji: "😌" },
  ];

  const currentPhaseData = PHASES.find((p) => p.phase === phase);

  const runRound = useCallback((r: number) => {
    if (r >= ROUNDS) {
      setPhase("done");
      setTimeout(() => setDone(true), 800);
      return;
    }
    setRound(r + 1);
    let phaseIdx = 0;

    function nextPhase() {
      if (phaseIdx >= PHASES.length) {
        runRound(r + 1);
        return;
      }
      const p = PHASES[phaseIdx];
      setPhase(p.phase);
      setCount(p.duration);
      phaseIdx++;

      let remaining = p.duration;
      const interval = setInterval(() => {
        remaining--;
        setCount(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          nextPhase();
        }
      }, 1000);
    }
    nextPhase();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStart() {
    runRound(0);
  }

  function handleReset() {
    setPhase("idle");
    setRound(0);
    setCount(0);
    setDone(false);
  }

  const circleColor = currentPhaseData?.color ?? "#4caf8c";

  return (
    <ExerciseShell
      id="breathing"
      title="Respiración"
      emoji="🌬️"
      color="#4a90d9"
      stars={1}
      done={done}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center justify-center flex-1 py-8">
        {phase === "idle" && (
          <div className="text-center fade-in">
            <div className="text-8xl mb-6 float">🌬️</div>
            <h2 className="text-2xl font-bold text-[#1a2744] mb-3">
              Ejercicio de Respiración
            </h2>
            <p className="text-gray-500 text-base mb-2">
              Vamos a hacer <strong>{ROUNDS} respiraciones</strong> profundas juntos.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Poné las manitos en la panza y sentí cómo sube y baja 🤲
            </p>
            <button
              onClick={handleStart}
              className="btn-press px-8 py-4 rounded-2xl text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #4a90d9, #2d6bb5)",
                boxShadow: "0 4px 20px rgba(74,144,217,0.4)",
              }}
            >
              ¡Empezar! 🚀
            </button>
          </div>
        )}

        {phase !== "idle" && phase !== "done" && (
          <div className="text-center fade-in w-full">
            <p className="text-gray-400 text-sm mb-2">
              Ronda {round} de {ROUNDS}
            </p>

            {/* Animated circle */}
            <div className="relative flex items-center justify-center my-8">
              {/* Outer pulse ring */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 220,
                  height: 220,
                  background: `${circleColor}15`,
                  transition: "transform 0.5s ease, background 0.5s ease",
                  transform: phase === "inhale" ? "scale(1.2)" : "scale(1)",
                }}
              />
              {/* Main circle */}
              <div
                className="flex flex-col items-center justify-center rounded-full text-white font-bold"
                style={{
                  width: 180,
                  height: 180,
                  background: `linear-gradient(135deg, ${circleColor}, ${circleColor}99)`,
                  boxShadow: `0 0 40px ${circleColor}50`,
                  transition: "transform 4s ease, background 0.5s ease",
                  transform:
                    phase === "inhale"
                      ? "scale(1.15)"
                      : phase === "exhale"
                      ? "scale(0.9)"
                      : "scale(1)",
                }}
              >
                <span className="text-5xl mb-1">{currentPhaseData?.emoji}</span>
                <span className="text-3xl font-black">{count}</span>
              </div>
            </div>

            <p
              className="text-2xl font-bold mb-1"
              style={{ color: circleColor }}
            >
              {currentPhaseData?.label}
            </p>

            {/* Round dots */}
            <div className="flex gap-2 justify-center mt-6">
              {Array.from({ length: ROUNDS }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: 10,
                    height: 10,
                    background: i < round ? "#4a90d9" : "#e0e0e0",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {phase === "done" && !done && (
          <div className="text-center">
            <div className="text-8xl mb-4 float">😌</div>
            <p className="text-2xl font-bold text-[#1a2744]">¡Lo hiciste genial!</p>
          </div>
        )}
      </div>
    </ExerciseShell>
  );
}
