"use client"

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion"

import VocabWord from "@/components/VocabWord";
import { difficultySettings } from "@/components/DifficultySelect";
import { genki1Vocab } from "@/data/genki1";
import type { Difficulty, VocabWordType } from "@/lib/types";

type Props = {
    selectedChapters: number[];
    selectedDifficulty: Difficulty
    onGameEnd: (correct: number, misses: number) => void;
    goBack: () => void;
};

export default function GameBoard({ selectedChapters, selectedDifficulty, goBack, onGameEnd }: Props) {
    const [vocab, setVocab] = useState<VocabWordType[]>([])
    const [displayedWordID, setDisplayedWordID] = useState<number>(0)
    const [userGuess, setUserGuess] = useState<string>("")
    const [falseText, setFalseText] = useState<string>("")
    const [missTotal, setMissTotal] = useState<number>(0)
    const [correctTotal, setCorrectTotal] = useState<number>(0)
    const [xPos, setXPos] = useState<number>(0)

    //Find board width to render radnom x value
    const boardRef = useRef<HTMLDivElement>(null);
    const [boardWidth, setBoardWidth] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);

    //function to reset game
    const reset = () => {
        setDisplayedWordID(0);
        setUserGuess("");
        setFalseText("");
        setMissTotal(0);
        setCorrectTotal(0);
    }

    //Sets next word
    const nextWord = () => {
        setFalseText("")
        setDisplayedWordID((prev) => prev + 1);
    }

    //Handles misses
    const handleMiss = () => {
        const newMissTotal = missTotal + 1;
        setMissTotal(newMissTotal);
        if (displayedWordID >= vocab.length - 1) {
            onGameEnd(correctTotal, newMissTotal);
        }
        else {
            nextWord();
        }
    }

    //handles guesses and displays incorrect text and loops around when words finish
    const handleGuess = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!vocab.length) return;

        const currentWord = vocab[displayedWordID];
        if (!currentWord) return;

        setFalseText("");

        //change guess word to lowercase
        const guess = userGuess.trim().toLowerCase();

        //Check all available meanings of word in lowercase to guess
        const isCorrect = vocab[displayedWordID].meaning.some(
            (word) => guess === word.toLowerCase()
        );

        if (isCorrect) {
            setUserGuess("");
            const newCorrectTotal = correctTotal + 1;
            setCorrectTotal(newCorrectTotal);
            //Check if game is over
            if (displayedWordID >= vocab.length - 1) {
                onGameEnd(newCorrectTotal, missTotal);
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

    function shuffleArray<T>(arr: T[]) {
        return [...arr].sort(() => Math.random() - 0.5);
    }

    //Sets vocab based on selected chapters and shuffles once
    useEffect(() => {
        const chapters = genki1Vocab.filter(word => selectedChapters.includes(word.chapter));

        setVocab(shuffleArray(chapters));
    }, [selectedChapters]);

    //Updates x start pos based on board width
    useEffect(() => {
        if (boardWidth > 0) {
            setXPos(Math.random() * (boardWidth - 150))
        }
    }, [displayedWordID, boardWidth])

    //Set the board width to update x start pos
    useEffect(() => {
        if (boardRef.current) {
            setBoardWidth(boardRef.current.offsetWidth)
        }
    }, [])

    //Place auto focus on input bar so user can type without selecting input
    useEffect(() => {
        inputRef.current?.focus()
    }, [displayedWordID])

    //Resets counter when vocab resets
    useEffect(() => {
        setDisplayedWordID(0);
    }, [vocab])


    return (
        <>
            <div
                ref={boardRef}
                className="relative flex flex-col items-center bg-yellow-100 h-[500px] w-5xl overflow-hidden">
                {vocab.length > 0 && vocab[displayedWordID] && (
                    <motion.div
                        className="absolute whitespace-nowrap"
                        key={displayedWordID}
                        style={{ left: xPos }}
                        initial={{ y: 0 }}
                        animate={{ y: 430 }}
                        transition={{ duration: difficultySettings[selectedDifficulty], ease: "linear" }}
                        onAnimationComplete={handleMiss}
                    >
                        <VocabWord word={vocab[displayedWordID]} />
                    </motion.div>
                )}
            </div>


            <div className="flex flex-col items-center gap-2">
                {falseText && <p className="text-red-500">{falseText}</p>}
                <div className="flex flex row gap-4">
                    {correctTotal > 0 && <p>Correct: {correctTotal}</p>}
                    <form onSubmit={handleGuess}>
                        <input className="bg-white border w-125 mb-4"
                            ref={inputRef}
                            type="text"
                            name="Guess"
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value)}
                        />
                    </form>
                    {missTotal > 0 && <p>Misses: {missTotal}</p>}
                </div>
                <button
                    onClick={() => {
                        reset();
                        goBack();
                    }}
                    className="bg-gray-400 px-4 py-2 rounded"
                >
                    Back
                </button>
            </div>
        </>
    )
}