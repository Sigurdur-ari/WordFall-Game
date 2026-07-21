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
    const [yEnd, setYEnd] = useState<number>(0)
    const [boardWidth, setBoardWidth] = useState<number>(0)
    const [boardHeight, setBoardHeight] = useState<number>(0)
    const [displayWord, setDisplayWord] = useState<boolean>(false)
    const [isWordActive, setIsWordActive] = useState<boolean>(true)
    const [animationHasStarted, setAnimationHasStarted] = useState<boolean>(false)

    //Refs to calculate board and word width and height to place word on board
    const boardRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLDivElement>(null);

    //Ref on the input to place auto focus
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
        setFalseText("");
        setDisplayWord(false);
        setIsWordActive(true);
        setAnimationHasStarted(false);
        setDisplayedWordID((prev) => prev + 1);
    }

    //Handles misses
    const handleMiss = () => {
        //Ignore miss if word is not visible yet or yEnd is 0 or if animation has started. Fixes random first word miss
        if (!displayWord || yEnd <= 0 || !animationHasStarted) return;
        //Check if word is already answered
        if (!isWordActive) return;

        //lock the state of the word
        setIsWordActive(false);

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

        //Check if vocab exists
        if (!vocab.length) return;

        //Check if current word exists in vocab
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
            //Check if word is already answered
            if (!isWordActive) return;

            //lock the state of the word
            setIsWordActive(false);
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

    function shuffleArray<T>(arr: T[]): T[] {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    //Sets vocab based on selected chapters and shuffles once
    useEffect(() => {
        const chapters = genki1Vocab.filter(word => selectedChapters.includes(word.chapter));
        //eslint-disable-next-line react-hooks/set-state-in-effect
        setVocab(shuffleArray(chapters));
    }, [selectedChapters]);

    //Place auto focus on input bar so user can type without selecting input
    useEffect(() => {
        inputRef.current?.focus()
    }, [displayedWordID])

    //Resets counter when chapters change
    useEffect(() => {
        //eslint-disable-next-line react-hooks/set-state-in-effect
        setDisplayedWordID(0);
    }, [selectedChapters])


    //Set board and word refs for first displayed word, changes when vocab changes
    useEffect(() => {
        if (boardRef.current && wordRef.current && vocab.length > 0) {
            const tempBoardHeight = boardRef.current.offsetHeight
            const tempBoardWidth = boardRef.current.offsetWidth
            setBoardWidth(tempBoardWidth);
            setBoardHeight(tempBoardHeight);
            const wordWidth = wordRef.current.offsetWidth;
            const wordHeight = wordRef.current.offsetHeight;

            const padding = 16;

            setXPos(Math.random() * (tempBoardWidth - wordWidth - padding * 2) + padding);
            setYEnd(tempBoardHeight - wordHeight);

            setDisplayWord(true);
        }
    }, [vocab]);


    //Sets word refs for every next word, waits for word to render before calculating
    useEffect(() => {
        if (!boardRef.current || !wordRef.current) return;

        // wait one frame so word can render
        requestAnimationFrame(() => {
            const word = wordRef.current!;

            const wordWidth = word.offsetWidth;
            const wordHeight = word.offsetHeight;

            const padding = 16;

            const safeX =
                Math.max(
                    padding,
                    Math.random() * (boardWidth - wordWidth - padding * 2) + padding
                );

            const safeY = boardHeight - wordHeight;

            setXPos(safeX);
            setYEnd(safeY);

            setDisplayWord(true);
        });
    }, [displayedWordID, boardHeight, boardWidth]);


    return (
        <div className="flex flex-col items-center w-full flex-1 min-h-0">
            <div
                ref={boardRef}
                className="relative w-full flex-1 min-h-0 overflow-hidden rounded-xl shadow-lg bg-gradient-to-b from-pink-50 via-white to-yellow-50 touch-game"
            >
                {vocab.length > 0 && vocab[displayedWordID] && (
                    <motion.div
                        ref={wordRef}
                        className="absolute whitespace-nowrap"
                        key={displayedWordID}
                        style={{
                            left: xPos,
                            visibility: displayWord ? "visible" : "hidden"
                        }}
                        initial={{ y: 0 }}
                        animate={displayWord && yEnd > 0 ? { y: yEnd } : { y: 0 }}
                        transition={{ duration: difficultySettings[selectedDifficulty], ease: "linear" }}
                        onAnimationStart={() => setAnimationHasStarted(true)}
                        onAnimationComplete={() => {
                            if (!animationHasStarted) return;
                            handleMiss();
                        }}
                    >
                        <VocabWord word={vocab[displayedWordID]} />
                    </motion.div>
                )}
            </div>


            <div className="flex flex-col items-center gap-2 mt-2 shrink-0">
                {falseText && <p className="text-red-500 font-medium">{falseText}</p>}
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 p-2 bg-white/50 backdrop-blur-sm rounded-lg shadow-md w-full">
                    <div className="flex items-center justify-between w-full md:w-auto md:gap-4">
                        <p className="text-green-600 font-semibold text-sm md:text-base">Correct: {correctTotal}</p>
                        <p className="text-red-600 font-semibold text-sm md:text-base">Misses: {missTotal}</p>
                    </div>
                    <form onSubmit={handleGuess} className="w-full md:w-auto">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userGuess}
                            onChange={(e) => setUserGuess(e.target.value)}
                            className="w-full md:w-auto bg-white/80 border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                        />
                    </form>
                </div>
                <button
                    onClick={() => {
                        reset();
                        goBack();
                    }}
                    className="bg-gray-400 px-4 py-3 rounded hover:bg-gray-500 transition"
                >
                    Back
                </button>
            </div>
        </div>
    )
}
