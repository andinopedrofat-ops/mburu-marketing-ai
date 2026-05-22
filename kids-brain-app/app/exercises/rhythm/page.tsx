"use client";

import { useState, useCallback, useRef } from "react";
import ExerciseShell from "@/app/components/ExerciseShell";

const NOTES = ["🔴", "🟡", "🔵", "🟢"];
const COLORS_MAP: Record<string, string> = {
  "🔴": "#ef5350",
  "🟡": "#ffcc00",
  "🔵": "#4a90d9",
  "🟢": "#4caf8c",
};

const ROUNDS = 5;

function makePattern(length: number): string[] {
  return Array.from({ length }, () => NOTES[Math.floor(Math.random() * NOTES.length)]);
}

type Phase = "show" | "input" | "feedback";

export default function RhythmExercise() {
  const [started, setStarted] = useState(false);
  const [roundNum, setRoundNum] = useState(1);
  const [pattern, setPattern] = useState<string[]>([]);
  const [input, setInput] = useState<string[]>([]);
  const [phase, setPhase] = useState<Phase>("show");
  const [activeIdx, setActiveIdx] = useState(-1);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const showPattern = useCallback((pat: string[]) => {
    setPhase("show");
    setActiveIdx(-1);
    setInput([]);

    let delay = 600;
    pat.forEach((_, i) => {
      const t1 = setTimeout(() => setActiveIdx(i), delay);
      const t2 = setTimeout(() => setActiveIdx(-1), delay + 500);
      timeoutsRef.current.push(t1, t2);
      delay += 800;
    });

    const t3 = setTimeout(() => {
      setActiveIdx(-1);
      setPhase("input");
    }, delay + 200);
    timeoutsRef.current.push(t3);
  }, []);

  function startRound(r: number) {
    const len = Math.min(2 + r, 5);
    const pat = makePattern(len);
    setPattern(pat);
    setRoundNum(r);
    setInput([]);
    setLastCorrect(null);
    showPattern(pat);
  }

  function handleStart() {
    setStarted(true);
    startRound(1);
  }

  function handleNotePress(note: string) {
    if (phase !== "input") return;
    const newInput = [...input, note];
    setInput(newInput);

    if (newInput.length === pattern.length) {
      const isCorrect = newInput.every((n, i) => n === pattern[i]);
      setLastCorrect(isCorrect);
      setPhase("feedback");
      if (isCorrect) setCorrect((c) => c + 1);

      setTimeout(() => {
        if (roundNum >= ROUNDS) {
          setDone(true);
        } else {
          startRound(roundNum + 1);
        }
      }, 1200);
    }
  }

  function handleReset() {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setStarted(false);
    setRoundNum(1);
    setPattern([]);
    setInput([]);
    setPhase("show");
    setActiveIdx(-1);
    setCorrect(0);
    setDone(false);
    setLastCorrect(null);
  }

  return (
    <ExerciseShell
      id="rhythm"
      title="Ritmo"
      emoji="🎵"
      color="#f06292"
      stars={2}
      done={done}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center w-full py-4 fade-in">
        {!started && (
          <div className="text-center">
            <div className="text-8xl mb-5 float">🎵</div>
            <h2 className="text-2xl font-bold text-[#1a2744] mb-3">
              ¡Sigue el ritmo!
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              Vas a ver una secuencia de colores. ¡Después repetila!
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Hay {ROUNDS} rondas y los patrones se hacen más largos 🧩
            </p>
            <button
              onClick={handleStart}
              className="btn-press px-8 py-4 rounded-2xl text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #f06292, #c2185b)",
                boxShadow: "0 4px 20px rgba(240,98,146,0.4)",
              }}
            >
              ¡Empezar! 🚀
            </button>
          </div>
        )}

        {started && !done && (
          <>
            {/* Progress */}
            <div className="w-full mb-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Ronda {roundNum} de {ROUNDS}</span>
                <span>✅ {correct} correctas</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full"
                  style={{ width: `${(roundNum / ROUNDS) * 100}%`, background: "#f06292" }}
                />
              </div>
            </div>

            {/* Phase label */}
            <p className="text-sm font-medium text-gray-500 mb-4">
              {phase === "show" && "👀 Mirá la secuencia..."}
              {phase === "input" && "👆 ¡Ahora repetila!"}
              {phase === "feedback" &&
                (lastCorrect ? "🎉 ¡Correcto!" : "😊 ¡Casi! Seguimos...")}
            </p>

            {/* Pattern display */}
            <div className="flex gap-3 mb-6 min-h-[56px] items-center justify-center">
              {pattern.map((note, i) => (
                <div
                  key={i}
                  className="rounded-2xl flex items-center justify-center text-2xl transition-all duration-200"
                  style={{
                    width: 48,
                    height: 48,
                    background: activeIdx === i ? COLORS_MAP[note] : "#e8e8e8",
                    transform: activeIdx === i ? "scale(1.3)" : "scale(1)",
                    boxShadow: activeIdx === i ? `0 0 20px ${COLORS_MAP[note]}80` : "none",
                  }}
                >
                  {phase !== "show" || activeIdx === i ? note : "❓"}
                </div>
              ))}
            </div>

            {/* User input display */}
            {phase === "input" && (
              <div className="flex gap-2 mb-4 min-h-[40px] items-center">
                {input.map((note, i) => (
                  <div
                    key={i}
                    className="rounded-xl flex items-center justify-center text-xl scale-in"
                    style={{
                      width: 40, height: 40,
                      background: COLORS_MAP[note],
                    }}
                  >
                    {note}
                  </div>
                ))}
                {Array.from({ length: pattern.length - input.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="rounded-xl border-2 border-dashed border-gray-300"
                    style={{ width: 40, height: 40 }}
                  />
                ))}
              </div>
            )}

            {/* Buttons */}
            {phase === "input" && (
              <div className="grid grid-cols-2 gap-4 w-full mt-2">
                {NOTES.map((note) => (
                  <button
                    key={note}
                    onClick={() => handleNotePress(note)}
                    className="btn-press rounded-2xl h-20 text-4xl flex items-center justify-center"
                    style={{
                      background: COLORS_MAP[note],
                      boxShadow: `0 4px 16px ${COLORS_MAP[note]}50`,
                    }}
                  >
                    {note}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </ExerciseShell>
  );
}
