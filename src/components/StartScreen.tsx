"use client"

type Props = {
    start: () => void;
};

export default function StartScreen({ start }: Props) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-4xl font-bold">Genki Falling Words Game</h1>
            <button
                onClick={start}
                className="bg-blue-500 text white px-6 py-3 rounded"
            >
                Start Game!
            </button>
        </div>
    )
}