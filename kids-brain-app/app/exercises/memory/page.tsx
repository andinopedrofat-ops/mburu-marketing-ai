"use client";

import { useState, useCallback, useEffect } from "react";
import ExerciseShell from "@/app/components/ExerciseShell";

const EMOJIS = ["🐶", "🐱", "🦊", "🐸", "🦄", "🐧"];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function makeCards(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  return shuffled.map((emoji, id) => ({ id, emoji, flipped: false, matched: false }));
}

export default function MemoryExercise() {
  const [cards, setCards] = useState<Card[]>(makeCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const [locked, setLocked] = useState(false);

  const matched = cards.filter((c) => c.matched).length;

  useEffect(() => {
    if (matched === cards.length && cards.length > 0) {
      setTimeout(() => setDone(true), 600);
    }
  }, [matched, cards.length]);

  const handleFlip = useCallback(
    (id: number) => {
      if (locked) return;
      const card = cards[id];
      if (card.flipped || card.matched || flipped.includes(id)) return;

      const newFlipped = [...flipped, id];
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
      );
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);
        const [a, b] = newFlipped;
        const cardA = cards[a];
        const cardB = cards[b];

        if (cardA.emoji === cardB.emoji) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === a || c.id === b ? { ...c, matched: true } : c
              )
            );
            setFlipped([]);
            setLocked(false);
          }, 600);
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === a || c.id === b ? { ...c, flipped: false } : c
              )
            );
            setFlipped([]);
            setLocked(false);
          }, 1000);
        }
      }
    },
    [cards, flipped, locked]
  );

  function handleReset() {
    setCards(makeCards());
    setFlipped([]);
    setMoves(0);
    setDone(false);
    setLocked(false);
  }

  return (
    <ExerciseShell
      id="memory"
      title="Memoria"
      emoji="🧠"
      color="#9c6fde"
      stars={2}
      done={done}
      onReset={handleReset}
    >
      <div className="flex flex-col items-center w-full py-4 fade-in">
        {/* Stats */}
        <div className="flex gap-6 mb-5">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#9c6fde]">{moves}</p>
            <p className="text-xs text-gray-400">Intentos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#4caf8c]">{matched / 2}</p>
            <p className="text-xs text-gray-400">Pares encontrados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1a2744]">{EMOJIS.length - matched / 2}</p>
            <p className="text-xs text-gray-400">Restan</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 text-center">
          Tocá las cartas para encontrar los pares iguales 👆
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-4 gap-2.5 w-full">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleFlip(card.id)}
              className="btn-press aspect-square rounded-2xl flex items-center justify-center text-3xl font-bold relative overflow-hidden"
              style={{
                background: card.flipped || card.matched
                  ? card.matched
                    ? "linear-gradient(135deg, #4caf8c, #2d8c6a)"
                    : "linear-gradient(135deg, #9c6fde, #7b52c2)"
                  : "linear-gradient(135deg, #1a2744, #2d4a8a)",
                boxShadow: card.matched
                  ? "0 4px 12px rgba(76,175,140,0.4)"
                  : "0 2px 8px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
              }}
            >
              {card.flipped || card.matched ? (
                <span style={{ animation: "scaleIn 0.2s ease" }}>{card.emoji}</span>
              ) : (
                <span className="text-2xl text-white/40">?</span>
              )}
              {card.matched && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "rgba(76,175,140,0.2)" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </ExerciseShell>
  );
}
