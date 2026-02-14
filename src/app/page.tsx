import GameBoard from "@/components/GameBoard";
import Header from "@/components/Header";


export default function Home() {
  return (
    <div className="flex flex-col content-center items-center h-screen">
      <Header />
      <GameBoard />
    </div>
  );
}
