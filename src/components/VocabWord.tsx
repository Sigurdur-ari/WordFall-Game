"use client";

import type { VocabWordType } from "@/lib/types";

export default function VocabWord({ word }: { word: VocabWordType }) {
    return (
        <div className="flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md">
            <h1 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-1">
                {word.japanese}
            </h1>
            {word.kanji && (
                <p className="text-gray-700 text-lg sm:text-xl font-medium">{word.kanji}</p>
            )}
        </div>
    );
}