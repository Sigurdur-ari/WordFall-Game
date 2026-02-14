"use client"

import { useState } from "react";
import { motion } from "framer-motion"

import VocabWord from "@/components/VocabWord";
import vocabularyRaw from "@/data/genki1_1.json";
import type { VocabWordType } from "@/lib/types";

export default function GameBoard() {
    const [displayedWordID, setDisplayedWordID] = useState<number>(0)
    const [userGuess, setUserGuess] = useState<string>("")
    const [falseText, setFalseText] = useState<string>("")
    const [missTotal, setMissTotal] = useState<number>(0)
    const [correctTotal, setCorrectTotal] = useState<number>(0)

    const vocab: VocabWordType[] = vocabularyRaw.vocabulary;

    //function to reset game
    function reset() {
        setDisplayedWordID(0);
        setUserGuess("");
        setFalseText("");
        setMissTotal(0);
        setCorrectTotal(0);
    }

    function nextWord() {
        setDisplayedWordID(displayedWordID + 1);
    }

    function handleMiss() {
        setMissTotal(missTotal + 1);
        nextWord();
    }

    const handleGuess = (e: React.SubmitEvent) => {
        e.preventDefault();

        setFalseText("");

        if (userGuess == vocab[displayedWordID].meaning) {
            setUserGuess("");
            setCorrectTotal(correctTotal + 1)
            if (displayedWordID >= vocab.length - 1) {
                setDisplayedWordID(0);
            }
            else {
                nextWord();
            }
        }
        else {
            setFalseText("Try again!");
            setUserGuess("");
        }
    }

    return (
        <div className="flex flex-col content-center items-center bg-yellow-100 h-150 w-5xl ">
            <motion.div
                className="flex-1"
                key={displayedWordID}
                initial={{ y: 0 }}
                animate={{ y: 450 }}
                transition={{ duration: 10, ease: "linear" }}
                onAnimationComplete={handleMiss}
            >
                <VocabWord word={vocab[displayedWordID]} />
            </motion.div>


            {falseText && <p className="text-red-500">{falseText}</p>}
            <div className="flex flex row gap-4">
                {correctTotal > 0 && <p>Correct: {correctTotal}</p>}
                <form onSubmit={handleGuess}>
                    <input className="bg-white border w-125 mb-4"
                        type="text"
                        name="Guess"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                    />
                </form>
                {missTotal > 0 && <p>Misses: {missTotal}</p>}
            </div>
        </div>
    )
}