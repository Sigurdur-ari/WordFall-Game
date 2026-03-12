export type VocabWordType = {
    id: string;
    chapter: number;
    japanese: string;
    kanji: string;
    meaning: string[];
    wordType: string;
};

export type Difficulty = "easy" | "medium" | "hard" | "extreme";