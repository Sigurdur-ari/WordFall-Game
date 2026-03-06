"use client"

type Props = {
    selected: number[];
    setSelected: (chapters: number[]) => void;
    startGame: () => void;
    goBack: () => void;
}

export default function ChapterSelect({ selected, setSelected, startGame, goBack }: Props) {

    function toggleChapter(chapter: number) {
        if (selected.includes(chapter)) {
            setSelected(selected.filter((c) => c !== chapter));
        } else {
            setSelected([...selected, chapter]);
        }
    }

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <h2 className="text-2xl font-bold">Select Chapters!</h2>
            <div className="flex flex-col gap-2">
                {[1, 2, 3].map((chapter) => (
                    <label key={chapter}>
                        <input
                            type="checkbox"
                            checked={selected.includes(chapter)}
                            onChange={() => toggleChapter(chapter)}
                        />
                        {" "}Chapter {chapter}
                    </label>
                ))}
            </div>
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