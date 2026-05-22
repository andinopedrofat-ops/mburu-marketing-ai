"use client";

import { useState, useCallback } from "react";
import ExerciseShell from "@/app/components/ExerciseShell";

const EMOJIS_POOL = ["⭐", "🍎", "🌸", "🐶", "🦋", "🍪", "🌈", "🐠"];
const ROUNDS = 6;

function makeRound(prevAnswer?: number) {
  const emoji = EMOJIS_POOL[Math.floor(Math.random() * EMOJIS_POOL.length)];
  let count = Math.floor(Math.random() * 7) + 2; // 2-8
  // avoid repeating same count
  while (count === prevAnswer) {
    count = Math.floor(Math.random() * 7) + 2;
  }
  // wrong options
  const options = new Set<number>([count]);
  while (options.size < 4) {
    const o = Math.max(1, count + Math.floor(Math.random() * 5) - 2);
    options.add(o);
  }
  return {
    emoji,
    count,
    options: [...options].sort(() => Math.random() - 0.5),
  };
}

export default function CountingExercise() {
  const [round, setRound] = useState(() => makeRound());
  const [roundNum, setRoundNum] = useState(1);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const [bouncing, setBouncing] = useState<number | null>(null);

  const handleSelect = useCallback(
    (val: number) => {
      if (selected !== null) return;
      setSelected(val);
      const isCorrect = val === round.count;
      if (isCorrect) setCorrect((c) => c + 1);

      // bounce effect
      setBouncing(val);
      setTimeout(() => setBouncing(null), 400);

      setTimeout(() => {
        if (roundNum >= ROUNDS) {
          setDone(true);
        } else {
          setRound(makeRound(round.count));
          setRoundNum((r) => r + 1);
          setSelected(null);
        }
      }, 1000);
    },
    [selected, round.count, roundNum]
  );

  function handleReset() {
    setRound(makeRound());
    setRoundNum(1);
    setSelected(null);
    setCorrect(0);
    setDone(false);
    setBouncing(null);
  }

  return (
    <ExerciseShell
      id="counting"
      title="Contar"
      emoji="🔢"
      color="#ffcc00"
      stars={1}
      done={done}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center w-full py-4 fade-in">
        {/* Progress */}
        <div className="w-full mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Pregunta {roundNum} de {ROUNDS}</span>
            <span>✅ {correct} correctas</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{
                width: `${(roundNum / ROUNDS) * 100}%`,
                background: "linear-gradient(90deg, #ffcc00, #ff9800)",
              }}
            />
          </div>
        </div>

        <p className="text-[#1a2744] font-bold text-lg mb-4 text-center">
          ¿Cuántos {round.emoji} hay?
        </p>

        {/* Emoji display */}
        <div
          className="w-full rounded-3xl p-5 mb-5 flex flex-wrap gap-2 justify-center items-center min-h-[120px]"
          style={{
            background: "#fff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          }}
        >
          {Array.from({ length: round.count }).map((_, i) => (
            <span
              key={i}
              className="text-4xl scale-in"
              style={{
                animationDelay: `${i * 0.06}s`,
                display: "inline-block",
              }}
            >
              {round.emoji}
            </span>
          ))}
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-4 gap-3 w-full">
          {round.options.map((opt) => {
            const isSelected = selected === opt;
            const isCorrect = opt === round.count;
            let bg = "#fff";
            let border = "2px solid #e0e0e0";
            let textColor = "#1a2744";

            if (isSelected && isCorrect) {
              bg = "#4caf8c";
              border = "2px solid #4caf8c";
              textColor = "#fff";
            } else if (isSelected && !isCorrect) {
              bg = "#ef5350";
              border = "2px solid #ef5350";
              textColor = "#fff";
            } else if (selected !== null && isCorrect) {
              bg = "#e8f5f0";
              border = "2px solid #4caf8c";
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="btn-press rounded-2xl h-16 flex items-center justify-center font-black text-2xl transition-all"
                style={{
                  background: bg,
                  border,
                  color: textColor,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transform: bouncing === opt ? "scale(1.2)" : "scale(1)",
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <p
            className="mt-4 text-base font-bold fade-in"
            style={{ color: selected === round.count ? "#4caf8c" : "#ef5350" }}
          >
            {selected === round.count
              ? "¡Correcto! 🎉"
              : `Eran ${round.count} ${round.emoji}`}
          </p>
        )}
      </div>
    </ExerciseShell>
  );
}
