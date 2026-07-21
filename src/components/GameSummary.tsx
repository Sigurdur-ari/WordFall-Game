"use client"

import { motion } from "framer-motion";

type Props = {
    totalCorrect: number;
    totalMiss: number;
    goBack: () => void;
}

export default function GameSummary({ totalCorrect, totalMiss, goBack }: Props) {
    const totalWords = totalCorrect + totalMiss

    const percentage = totalWords > 0 ? Math.ceil((totalCorrect / totalWords) * 100) : 0;
    return (
        <div className="flex flex-col items-center justify-center w-full p-4 sm:p-8">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-6 w-full max-w-md p-4 sm:p-8 rounded-xl shadow-lg bg-gradient-to-b from-pink-50 via-white to-yellow-50"
            >
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
                    Game Summary
                </h2>

                <div className="flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-rose-100 shadow-inner">
                    <span className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {percentage}%
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                        Accuracy
                    </span>
                </div>

                <div className="flex justify-between w-full px-4 py-3 bg-white/50 backdrop-blur-sm rounded-lg shadow">
                    <p className="text-green-600 font-medium">
                        Correct: {totalCorrect}
                    </p>
                    <p className="text-red-600 font-medium">
                        Misses: {totalMiss}
                    </p>
                </div>

                <p className="text-gray-600">
                    {percentage == 100 ? "Perfect!" :
                        percentage >= 80 ? "Great job!" :
                            percentage >= 50 ? "Nice effort!" :
                                "Keep practicing!"}
                </p>

                <button
                    onClick={goBack}
                    className="bg-rose-200 px-6 py-2 rounded-lg shadow hover:bg-rose-300 transition-colors"
                >
                    Play Again
                </button>
            </motion.div>
        </div>
    )
}