"use client"
import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";
import StartScreen from "@/components/StartScreen"
import ChapterSelect from "@/components/ChapterSelect";

import { useState } from "react";

type DisplayScreen = "menu" | "chapterSelect" | "game"

export default function Home() {
  const [screen, setScreen] = useState<DisplayScreen>("menu");
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);

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
          startGame={() => setScreen("game")}
          goBack={() => setScreen("menu")}
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
          goBack={() => setScreen("chapterSelect")}
        />
      </div>
    );
  }
}
