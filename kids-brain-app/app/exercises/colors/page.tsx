"use client";

import { useState, useCallback } from "react";
import ExerciseShell from "@/app/components/ExerciseShell";

const COLOR_DATA = [
  { name: "Rojo", hex: "#ef5350", emoji: "🍎" },
  { name: "Azul", hex: "#4a90d9", emoji: "🫐" },
  { name: "Amarillo", hex: "#ffcc00", emoji: "🌻" },
  { name: "Verde", hex: "#4caf8c", emoji: "🍀" },
  { name: "Naranja", hex: "#ff7043", emoji: "🍊" },
  { name: "Violeta", hex: "#9c6fde", emoji: "🍇" },
];

const ROUNDS = 5;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeRound() {
  const target = COLOR_DATA[Math.floor(Math.random() * COLOR_DATA.length)];
  const others = shuffle(COLOR_DATA.filter((c) => c.name !== target.name)).slice(0, 3);
  const options = shuffle([target, ...others]);
  return { target, options };
}

export default function ColorsExercise() {
  const [round, setRound] = useState(makeRound);
  const [roundNum, setRoundNum] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const handleSelect = useCallback(
    (colorName: string) => {
      if (selected) return;
      setSelected(colorName);
      const isCorrect = colorName === round.target.name;
      if (isCorrect) setCorrect((c) => c + 1);

      setTimeout(() => {
        if (roundNum >= ROUNDS) {
          setDone(true);
        } else {
          setRound(makeRound());
          setRoundNum((r) => r + 1);
          setSelected(null);
        }
      }, 900);
    },
    [selected, round.target.name, roundNum]
  );

  function handleReset() {
    setRound(makeRound());
    setRoundNum(1);
    setSelected(null);
    setCorrect(0);
    setDone(false);
  }

  return (
    <ExerciseShell
      id="colors"
      title="Colores"
      emoji="🎨"
      color="#ff7043"
      stars={1}
      done={done}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center w-full py-4 fade-in">
        {/* Progress */}
        <div className="w-full mb-5">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Pregunta {roundNum} de {ROUNDS}</span>
            <span>✅ {correct} correctas</span>
          </div>
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${(roundNum / ROUNDS) * 100}%`, background: "#ff7043" }}
            />
          </div>
        </div>

        {/* Question */}
        <p className="text-[#1a2744] font-bold text-xl mb-2 text-center">
          ¿Cuál color es...
        </p>

        {/* Target color big display */}
        <div
          className="w-36 h-36 rounded-3xl flex flex-col items-center justify-center mb-6 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${round.target.hex}, ${round.target.hex}bb)`,
            boxShadow: `0 8px 24px ${round.target.hex}60`,
          }}
        >
          <span className="text-5xl">{round.target.emoji}</span>
          <p className="text-white font-bold text-lg mt-1 drop-shadow">
            {round.target.name.toUpperCase()}
          </p>
        </div>

        <p className="text-gray-500 text-sm mb-5">
          Tocá el cuadrado del color correcto 👇
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {round.options.map((opt) => {
            const isTarget = opt.name === round.target.name;
            const isSelected = selected === opt.name;
            let border = "2px solid transparent";
            if (isSelected && isTarget) border = "3px solid #4caf8c";
            if (isSelected && !isTarget) border = "3px solid #ef5350";

            return (
              <button
                key={opt.name}
                onClick={() => handleSelect(opt.name)}
                className="btn-press rounded-2xl h-20 flex items-center justify-center relative overflow-hidden"
                style={{
                  background: opt.hex,
                  border,
                  boxShadow: `0 4px 16px ${opt.hex}50`,
                  opacity: selected && !isSelected ? 0.5 : 1,
                  transition: "all 0.2s",
                }}
              >
                {isSelected && isTarget && (
                  <span className="absolute text-3xl">✅</span>
                )}
                {isSelected && !isTarget && (
                  <span className="absolute text-3xl">❌</span>
                )}
              </button>
            );
          })}
        </div>

        {selected && (
          <p
            className="mt-4 text-base font-bold"
            style={{ color: selected === round.target.name ? "#4caf8c" : "#ef5350" }}
          >
            {selected === round.target.name
              ? "¡Correcto! 🎉"
              : `Era ${round.target.name} 😊`}
          </p>
        )}
      </div>
    </ExerciseShell>
  );
}
