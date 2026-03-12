"use client"
import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";
import StartScreen from "@/components/StartScreen"
import ChapterSelect from "@/components/ChapterSelect";

import { useState } from "react";
import DifficultySelect from "@/components/DifficultySelect";
import { Difficulty } from "@/lib/types";

type DisplayScreen = "menu" | "chapterSelect" | "difficultySelect" | "game"

export default function Home() {
  const [screen, setScreen] = useState<DisplayScreen>("menu");
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  if (screen == "menu") {
    return (
      <div className="flex flex-col content-center items-center h-screen">
        <Header />
        <StartScreen start={() => setScreen("chapterSelect")} />
      </div>
    )
  }

  if (screen == "chapterSelect") {
    return (
      <div className="flex flex-col content-center items-center h-screen">
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
      <div className="flex flex-col content-center items-center h-screen">
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
      <div className="flex flex-col content-center items-center h-screen">
        <Header />
        <GameBoard
          selectedChapters={selectedChapters}
          selectedDifficulty={difficulty}
          goBack={() => setScreen("difficultySelect")}
        />
      </div>
    );
  }
}
