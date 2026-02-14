"use client"

import { useState } from "react";

import VocabWord from "@/components/VocabWord";
import vocabularyRaw from "@/data/genki1_1.json";
import type { VocabWordType } from "@/lib/types";

export default function GameBoard() {
    const [displayedWordID, setDisplayedWordID] = useState<number>(0)
    const [userGuess, setUserGuess] = useState<string>("")

    const vocab: VocabWordType[] = vocabularyRaw.vocabulary;

    const handleGuess = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (userGuess == vocab[displayedWordID].meaning) {
            setUserGuess("");
            if (displayedWordID >= vocab.length - 1) {
                setDisplayedWordID(0);
            }
            else {
                setDisplayedWordID(displayedWordID + 1);
            }
        }
    }

    return (
        <div className="flex flex-col content-center items-center bg-yellow-100 h-150 w-5xl ">
            <VocabWord word={vocab[displayedWordID]} />

            <form onSubmit={handleGuess}>
                <input className="bg-white border w-125"
                    type="text"
                    name="Guess"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                />
            </form>
        </div>
    )
}