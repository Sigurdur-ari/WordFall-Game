"use client";

import type { VocabWordType } from "@/lib/types";

export default function VocabWord({ word }: { word: VocabWordType }) {
    return (
        <div className="bg-pink-200 flex flex-col content-center items-center">
            <h1 className="text-4xl font-bold hover:text-red-800 text-black">
                {word.japanese}
            </h1>
            <p className="text-black">{word.kanji}</p>
        </div>
    );
}