"use client"

export default function Header() {
    return (
        <div className="flex flex-col items-center gap-2 mb-4">
            <h1 className="text-4xl font-semibold text-gray-800 tracking-wide">
                日本語ゲーム
            </h1>
            <div className="w-12 h-[2px] bg-rose-300 rounded-full"></div>
            <p className="text-sm text-gray-500">
                Japanese Vocab Practice
            </p>
        </div>
    )
}