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

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <h2 className="text-2xl font-bold">Select Difficulty!</h2>
            <form>
                <div className="flex flex-col gap-2">
                    <input
                        id="easyDifficulty"
                        type="radio"
                        name="difficulty"
                        checked={difficulty === "easy"}
                        onChange={(e) => setDifficulty("easy")}
                    />
                    <label htmlFor="easyDifficulty">Easy</label>

                    <input
                        id="mediumDifficulty"
                        type="radio"
                        name="difficulty"
                        checked={difficulty === "medium"}
                        onChange={(e) => setDifficulty("medium")}
                    />
                    <label htmlFor="mediumDifficulty">Medium</label>

                    <input
                        id="hardDifficulty"
                        type="radio"
                        name="difficulty"
                        checked={difficulty === "hard"}
                        onChange={(e) => setDifficulty("hard")}
                    />
                    <label htmlFor="hardDifficulty">Hard</label>

                    <input
                        id="extremeDifficulty"
                        type="radio"
                        name="difficulty"
                        checked={difficulty === "extreme"}
                        onChange={(e) => setDifficulty("extreme")}
                    />
                    <label htmlFor="extremeDifficulty">Extreme</label>
                </div>
            </form>
            <button
                onClick={startGame}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Start Game!
            </button>
            <button
                onClick={goBack}
                className="bg-gray-400 px-4 py-2 rounded"
            >
                Go Back!
            </button>
        </div>
    )
}