import GameBoard from "@/components/GameBoard";
import VocabWord from "@/components/VocabWord";
import vocabularyRaw from "@/data/genki1_1.json";
import type { VocabWordType } from "@/lib/types";


export default function Home() {

  const vocab: VocabWordType[] = vocabularyRaw.vocabulary;

  return (
    <div className="flex flex-col content-center items-center">
      <GameBoard children={
        <>
          <VocabWord word={vocab[0]} />
          <VocabWord word={vocab[1]} />
          <VocabWord word={vocab[2]} />
        </>


      }

      />
    </div>
  );
}
