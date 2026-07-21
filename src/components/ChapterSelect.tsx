"use client"

type Props = {
    selected: number[];
    setSelected: (chapters: number[]) => void;
    nextStep: () => void;
    goBack: () => void;
}

export default function ChapterSelect({ selected, setSelected, nextStep, goBack }: Props) {

    function toggleChapter(chapter: number) {
        if (selected.includes(chapter)) {
            setSelected(selected.filter((c) => c !== chapter));
        } else {
            setSelected([...selected, chapter]);
        }
    }

    return (
        <div className="flex flex-col items-center gap-6 p-4 sm:p-8 w-full">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
                Select Chapters!
            </h2>
            <div className="flex flex-col gap-3 w-full max-w-xs">
                {[1, 2, 3].map((chapter) => {
                    const isSelected = selected.includes(chapter);
                    return (
                        <button
                            key={chapter}
                            onClick={() => toggleChapter(chapter)}
                            className={`
                                w-full px-4 py-3 rounded-lg 
                                text-gray-800 font-medium 
                                transition-all
                                ${isSelected
                                    ? "bg-rose-200 shadow-inner"
                                    : "bg-rose-50 hover:bg-rose-100"}
                            `}
                        >
                            Chapter {chapter}
                        </button>
                    )
                })}
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    onClick={nextStep}
                    disabled={selected.length === 0}
                    className={`bg-rose-200 px-6 py-2 rounded-lg shadow transition-colors ${
                        selected.length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-rose-300"
                    }`}
                >
                    Select Difficulty
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