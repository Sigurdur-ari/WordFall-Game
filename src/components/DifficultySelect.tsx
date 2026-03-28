"use client"

import { Difficulty } from "@/lib/types";

type Props = {
    difficulty: Difficulty;
    setDifficulty: (difficulty: Difficulty) => void;
    startGame: () => void;
    goBack: () => void;
}

export const difficultySettings: Record<Difficulty, number> = {
    easy: 30,
    medium: 20,
    hard: 10,
    extreme: 5
}

export default function DifficultySelect({ difficulty, setDifficulty, startGame, goBack }: Props) {

    const options: Difficulty[] = ["easy", "medium", "hard", "extreme"];

    const colors: Record<Difficulty, string> = {
        easy: "bg-green-100 hover:bg-green-200",
        medium: "bg-yellow-100 hover:bg-yellow-200",
        hard: "bg-orange-100 hover:bg-orange-200",
        extreme: "bg-red-100 hover:bg-red-200"
    };

    return (
        <div className="flex flex-col items-center gap-6 p-8 w-full">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
                Select Difficulty
            </h2>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                {options.map((opt) => {
                    const isSelected = difficulty === opt;
                    return (
                        <button
                            key={opt}
                            onClick={() => setDifficulty(opt)}
                            className={`
                                w-full px-4 py-3 rounded-lg text-gray-800 font-medium
                                transition-all
                                ${colors[opt]} 
                                ${isSelected ? "shadow-inner scale-110 ring" : ""}
                            `}
                        >
                            {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </button>
                    )
                })}
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={startGame}
                    className="bg-green-200 px-6 py-2 rounded-lg shadow hover:bg-green-300 transition-colors"
                >
                    Start Game
                </button>
                <button
                    onClick={goBack}
                    className="bg-gray-200 px-6 py-2 rounded-lg shadow hover:bg-gray-300 transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}