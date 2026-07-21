"use client"
import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";
import StartScreen from "@/components/StartScreen"
import ChapterSelect from "@/components/ChapterSelect";
import GameSummary from "@/components/GameSummary"

import { useState } from "react";
import DifficultySelect from "@/components/DifficultySelect";
import { Difficulty } from "@/lib/types";

type DisplayScreen = "menu" | "chapterSelect" | "difficultySelect" | "game" | "summary"

export default function Home() {
  const [screen, setScreen] = useState<DisplayScreen>("menu");
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [missTotal, setMissTotal] = useState<number>(0)
  const [correctTotal, setCorrectTotal] = useState<number>(0)

  if (screen === "menu") {
    return (
      <div className="flex items-center justify-center w-full px-4 py-4 sm:py-8">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 w-full max-w-[500px]">
          <Header />
          <StartScreen start={() => setScreen("chapterSelect")} />
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdL_rF2_WOF3ln3_bcsfCOYPOAiH8XfhVLvFOdK92__TxVcTg/viewform?usp=publish-editor"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded-lg shadow text-center transition-colors"
            >
              Feedback
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdhw3z9VKf7u9MvH_w5SUL_UOs3ncV4TODmu0WRxCFpMiH1sw/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-100 hover:bg-yellow-200 px-4 py-2 rounded-lg shadow text-center transition-colors"
            >
              Add Vocab
            </a>
          </div>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => alert("When you are ready, press start game. \n\nThen select which chapters you want to practice and then the difficulty. \n\nThen play and see your Japanese vocabulary increase :)")}
              className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white"
            >
              ?
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (screen === "chapterSelect") {
    return (
      <div className="flex items-center justify-center w-full px-4 py-4 sm:py-8">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 w-full max-w-[500px]">
          <Header />
          <ChapterSelect
            selected={selectedChapters}
            setSelected={setSelectedChapters}
            nextStep={() => setScreen("difficultySelect")}
            goBack={() => setScreen("menu")}
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={() => alert("Select which chapter/s you want to practice. \n\n You can choose as many chapters as you like and their vocabulary will be shuffled in the game. ")}
              className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white"
            >
              ?
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (screen === "difficultySelect") {
    return (
      <div className="flex items-center justify-center w-full px-4 py-4 sm:py-8">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 w-full max-w-[500px]">
          <Header />
          <DifficultySelect
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            startGame={() => setScreen("game")}
            goBack={() => setScreen("chapterSelect")}
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={() => alert("Select the difficulty of the game. \n\n Easy = 30s \n\n Medium = 20s \n\n Hard = 10s \n\n Extreme = 5s")}
              className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white"
            >
              ?
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (screen === "game") {
    return (
      <div className="flex flex-col items-center w-full h-dvh px-4 overflow-hidden">
        <div
          className="relative flex flex-1 flex-col w-full max-w-[500px] p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 overflow-hidden"
          style={{ maxHeight: "calc(100dvh - 2rem)" }}
        >
          <Header />
          <GameBoard
            selectedChapters={selectedChapters}
            selectedDifficulty={difficulty}
            onGameEnd={(correctTotal, missTotal) => {
              setCorrectTotal(correctTotal);
              setMissTotal(missTotal);
              setScreen("summary");
            }}
            goBack={() => setScreen("difficultySelect")}
          />
          <div className="absolute top-4 right-4">
            <button
              onClick={() => alert("Type the English meaning of the word before the it reaches the bottom!")}
              className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm shadow flex items-center justify-center hover:bg-white"
            >
              ?
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (screen === "summary") {
    return (
      <div className="flex items-center justify-center w-full px-4 py-4 sm:py-8">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-6 sm:p-8 w-full max-w-[500px]">
          <GameSummary
            totalCorrect={correctTotal}
            totalMiss={missTotal}
            goBack={() => setScreen("menu")}
          />
        </div>
      </div>
    )
  }
}
