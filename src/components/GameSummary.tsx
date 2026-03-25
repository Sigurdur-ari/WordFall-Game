"use client"

type Props = {
    totalCorrect: number;
    totalMiss: number;
    goBack: () => void;
}

export default function GameSummary({ totalCorrect, totalMiss, goBack }: Props) {
    const totalWords = totalCorrect + totalMiss

    const percentage = totalWords > 0 ? Math.ceil((totalCorrect / totalWords) * 100) : 0;
    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-2">
                    <p>Total correct guesses: {totalCorrect}</p>
                    <p>Total misses: {totalMiss}</p>
                </div>
                <h2>Your average results: {percentage}%</h2>
                <button
                    onClick={goBack}
                    className="bg-gray-400 px-4 py-2 rounded"
                >
                    Restart
                </button>
            </div>
        </>
    )
}