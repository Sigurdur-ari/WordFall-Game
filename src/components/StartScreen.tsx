"use client"

type Props = {
    start: () => void;
};

export default function StartScreen({ start }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
                Genki Falling Words Game
            </h2>

            <div className="w-16 h-[2px] bg-rose-300 rounded-full"></div>

            <button
                onClick={start}
                className="
                    bg-rose-200 
                    text-gray-800 
                    font-medium 
                    px-8 py-3 
                    rounded-xl 
                    shadow-md
                    hover:bg-rose-300
                    transition-colors
                "
            >
                Start Game!
            </button>
        </div>
    )
}