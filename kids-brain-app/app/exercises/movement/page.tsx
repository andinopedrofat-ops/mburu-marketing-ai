"use client";

import { useState, useEffect, useCallback } from "react";
import ExerciseShell from "@/app/components/ExerciseShell";

const ANIMALS = [
  { emoji: "🐸", name: "Rana", action: "¡Saltá como una rana!", instruction: "¡Párate y salta con las dos piernas!" },
  { emoji: "🦁", name: "León", action: "¡Rugí como un león!", instruction: "¡Abre bien la boca y rugí fuerte!" },
  { emoji: "🐘", name: "Elefante", action: "¡Movete como un elefante!", instruction: "¡Balancea los brazos como una trompa!" },
  { emoji: "🦅", name: "Águila", action: "¡Volá como un águila!", instruction: "¡Extendé los brazos y movetelos como alas!" },
  { emoji: "🐍", name: "Serpiente", action: "¡Reptá como una serpiente!", instruction: "¡Ponte en el piso y arrástate hacia adelante!" },
  { emoji: "🐒", name: "Mono", action: "¡Saltá como un mono!", instruction: "¡Salta de lado a lado rascándote la cabeza!" },
];

const POSE_DURATION = 8;
const ROUNDS = 4;

export default function MovementExercise() {
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [animal, setAnimal] = useState(ANIMALS[0]);
  const [countdown, setCountdown] = useState(POSE_DURATION);
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);

  const nextAnimal = useCallback(
    (r: number) => {
      if (r >= ROUNDS) {
        setDone(true);
        return;
      }
      const next = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
      setAnimal(next);
      setRound(r + 1);
      setReady(false);
      setCountdown(3);

      let c = 3;
      const readyInterval = setInterval(() => {
        c--;
        setCountdown(c);
        if (c <= 0) {
          clearInterval(readyInterval);
          setReady(true);
          setCountdown(POSE_DURATION);

          let t = POSE_DURATION;
          const poseInterval = setInterval(() => {
            t--;
            setCountdown(t);
            if (t <= 0) {
              clearInterval(poseInterval);
              nextAnimal(r + 1);
            }
          }, 1000);
        }
      }, 1000);
    },
    []
  );

  function handleStart() {
    setStarted(true);
    nextAnimal(0);
  }

  function handleReset() {
    setStarted(false);
    setRound(0);
    setCountdown(POSE_DURATION);
    setDone(false);
    setReady(false);
  }

  return (
    <ExerciseShell
      id="movement"
      title="Movimiento"
      emoji="🐸"
      color="#4caf8c"
      stars={1}
      done={done}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center w-full py-4 fade-in">
        {!started && (
          <div className="text-center">
            <div className="text-8xl mb-5 float">🐸</div>
            <h2 className="text-2xl font-bold text-[#1a2744] mb-3">
              ¡Imitá los animales!
            </h2>
            <p className="text-gray-500 text-sm mb-2">
              Vas a imitar <strong>{ROUNDS} animales</strong> diferentes.
            </p>
            <p className="text-gray-400 text-sm mb-8 px-4">
              Necesitás un poco de espacio para moverte. ¡Separá las sillas! 🪑
            </p>
            <button
              onClick={handleStart}
              className="btn-press px-8 py-4 rounded-2xl text-white font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #4caf8c, #2d8c6a)",
                boxShadow: "0 4px 20px rgba(76,175,140,0.4)",
              }}
            >
              ¡Empezar! 🚀
            </button>
          </div>
        )}

        {started && !done && (
          <div className="text-center w-full">
            {/* Round indicator */}
            <div className="flex gap-2 justify-center mb-4">
              {Array.from({ length: ROUNDS }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all"
                  style={{
                    width: 10,
                    height: 10,
                    background: i < round ? "#4caf8c" : "#e0e0e0",
                  }}
                />
              ))}
            </div>

            {!ready ? (
              <div className="flex flex-col items-center">
                <p className="text-gray-400 text-sm mb-4">Prepárate para...</p>
                <div className="text-9xl mb-4">{animal.emoji}</div>
                <p className="text-3xl font-black text-[#1a2744] mb-4">
                  {animal.name}
                </p>
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-black text-white"
                  style={{ background: "#4caf8c" }}
                >
                  {countdown}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center fade-in">
                <div
                  className="text-9xl mb-4 wiggle"
                  style={{ display: "inline-block" }}
                >
                  {animal.emoji}
                </div>
                <p
                  className="text-2xl font-extrabold mb-2"
                  style={{ color: "#4caf8c" }}
                >
                  {animal.action}
                </p>
                <p className="text-gray-500 text-sm mb-6 px-4">
                  {animal.instruction}
                </p>

                {/* Countdown ring */}
                <div className="relative flex items-center justify-center">
                  <svg width="80" height="80" className="-rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#e0e0e0" strokeWidth="6" />
                    <circle
                      cx="40" cy="40" r="34" fill="none"
                      stroke="#4caf8c" strokeWidth="6"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - countdown / POSE_DURATION)}`}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                  </svg>
                  <span className="absolute text-xl font-black text-[#1a2744]">
                    {countdown}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ExerciseShell>
  );
}
