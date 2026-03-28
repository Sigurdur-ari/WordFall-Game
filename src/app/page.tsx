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

  if (screen == "menu") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-[500px]">
        <Header />
        <StartScreen start={() => setScreen("chapterSelect")} />
      </div>
    )
  }

  if (screen == "chapterSelect") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-[500px]">
        <Header />
        <ChapterSelect
          selected={selectedChapters}
          setSelected={setSelectedChapters}
          nextStep={() => setScreen("difficultySelect")}
          goBack={() => setScreen("menu")}
        />
      </div>
    )
  }

  if (screen == "difficultySelect") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-[500px]">
        <Header />
        <DifficultySelect
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          startGame={() => setScreen("game")}
          goBack={() => setScreen("chapterSelect")}
        />
      </div>
    )
  }

  if (screen == "game") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-[500px]">
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
      </div>
    );
  }
  if (screen == "summary") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border border-gray-200 p-8 w-[500px]">
        <GameSummary
          totalCorrect={correctTotal}
          totalMiss={missTotal}
          goBack={() => setScreen("menu")}
        />
      </div>
    )
  }
}
