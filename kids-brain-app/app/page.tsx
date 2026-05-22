"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "gender" | "name";

export default function LandingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("gender");
  const [gender, setGender] = useState<"boy" | "girl" | null>(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  function handleGenderSelect(g: "boy" | "girl") {
    setGender(g);
    setStep("name");
  }

  function handleStart() {
    if (!name.trim()) {
      setNameError(true);
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("kidName", name.trim());
      localStorage.setItem("kidGender", gender ?? "boy");
      localStorage.setItem("kidStars", "0");
    }
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#f0f7f4]">
      <div className="w-full max-w-sm fade-in">

        {/* Brand */}
        <div className="text-center mb-6">
          <span
            className="text-2xl font-bold"
            style={{ color: "#4caf8c", fontFamily: "Georgia, serif", letterSpacing: "0.04em" }}
          >
            CerebritoActivo
          </span>
        </div>

        {step === "gender" && (
          <>
            <h1
              className="text-center font-extrabold text-[#1a2744] mb-3 leading-tight"
              style={{ fontSize: "clamp(1.6rem, 6vw, 2rem)" }}
            >
              EJERCICIOS DE<br />
              ACTIVACIÓN<br />
              CEREBRAL PARA NIÑOS
            </h1>

            <p className="text-center text-[#1a2744] text-sm mb-8 leading-relaxed px-2">
              Un plan <strong>divertido</strong> para desarrollar una{" "}
              <strong>mente flexible</strong> y redescubrir la{" "}
              <strong>alegría de la infancia</strong>
            </p>

            <p
              className="text-center text-sm font-medium mb-5"
              style={{ color: "#4caf8c" }}
            >
              ¿A quién está criando?
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* Niño */}
              <button
                onClick={() => handleGenderSelect("boy")}
                className="card-hover rounded-2xl overflow-hidden bg-[#e8f5f0] border-2 border-transparent hover:border-[#4caf8c] focus:outline-none"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="flex flex-col items-center pt-8 pb-0 px-4">
                  <div className="text-8xl mb-2 float">👦</div>
                  <div
                    className="w-full text-center text-white font-semibold py-3 mt-2 flex items-center justify-center gap-2"
                    style={{ background: "#4caf8c", fontSize: "1.05rem" }}
                  >
                    Niño <span>›</span>
                  </div>
                </div>
              </button>

              {/* Niña */}
              <button
                onClick={() => handleGenderSelect("girl")}
                className="card-hover rounded-2xl overflow-hidden bg-[#e8f5f0] border-2 border-transparent hover:border-[#4caf8c] focus:outline-none"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                <div className="flex flex-col items-center pt-8 pb-0 px-4">
                  <div className="text-8xl mb-2 float">👧</div>
                  <div
                    className="w-full text-center text-white font-semibold py-3 mt-2 flex items-center justify-center gap-2"
                    style={{ background: "#4caf8c", fontSize: "1.05rem" }}
                  >
                    Niña <span>›</span>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-center text-xs text-gray-400 mt-6 px-4 leading-relaxed">
              Al seleccionar aceptás nuestros{" "}
              <span className="underline text-[#4caf8c] cursor-pointer">Términos de Uso</span>{" "}
              y{" "}
              <span className="underline text-[#4caf8c] cursor-pointer">Política de Privacidad</span>.
            </p>
          </>
        )}

        {step === "name" && (
          <div className="scale-in">
            <div className="text-center mb-6">
              <div className="text-7xl mb-3 float">
                {gender === "girl" ? "👧" : "👦"}
              </div>
              <h2
                className="font-extrabold text-[#1a2744] mb-2"
                style={{ fontSize: "1.7rem" }}
              >
                ¿Cómo se llama{" "}
                {gender === "girl" ? "tu hija" : "tu hijo"}?
              </h2>
              <p className="text-gray-500 text-sm">
                Así haremos los ejercicios más personales 🌟
              </p>
            </div>

            <div className="mb-5">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder={gender === "girl" ? "Ej: Valentina" : "Ej: Mateo"}
                className="w-full px-5 py-4 rounded-2xl text-lg text-[#1a2744] font-medium outline-none border-2 transition-colors"
                style={{
                  background: "#fff",
                  borderColor: nameError ? "#ef5350" : "#4caf8c",
                  boxShadow: "0 2px 12px rgba(76,175,140,0.15)",
                  fontSize: "1.15rem",
                }}
                maxLength={20}
                autoFocus
              />
              {nameError && (
                <p className="text-red-400 text-sm mt-2 text-center">
                  Por favor, ingresá el nombre 😊
                </p>
              )}
            </div>

            <button
              onClick={handleStart}
              className="btn-press w-full py-4 rounded-2xl text-white font-bold text-lg transition-all"
              style={{
                background: "linear-gradient(135deg, #4caf8c, #2d8c6a)",
                boxShadow: "0 4px 16px rgba(76,175,140,0.4)",
                fontSize: "1.1rem",
              }}
            >
              ¡Empezar aventura! 🚀
            </button>

            <button
              onClick={() => setStep("gender")}
              className="w-full text-center text-gray-400 text-sm mt-4 py-2 hover:text-gray-600 transition-colors"
            >
              ← Volver
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
