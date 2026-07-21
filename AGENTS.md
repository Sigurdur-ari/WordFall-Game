# AGENTS.md

## Project

Japanese vocabulary game built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and framer-motion. Single-page client app (no server components, no API routes).

## Commands

```bash
npm run dev        # Dev server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run lint:fix   # ESLint auto-fix
```

No test suite, no typecheck script, no CI. Run `npm run lint` after changes.

## Structure

```
src/
  app/page.tsx          # Single page, all screen state managed here
  components/           # All UI components (all "use client")
  data/genki1/          # Vocabulary data (per-chapter files + index.ts)
  lib/types.ts          # Shared types (VocabWordType, Difficulty)
```

## Key conventions

- Path alias: `@/*` → `src/*` (tsconfig paths)
- Every component uses `"use client"` — no server components in use
- Tailwind v4: globals.css uses `@import "tailwindcss"` (not the old `@tailwind` directives)
- Prettier with default config (empty `.prettierrc`)
- Single-file app: all screen routing is state-driven in `page.tsx`, not via Next.js file-based routing

## Adding vocabulary

1. Create or edit a chapter file in `src/data/genki1/chapterN.ts` exporting `VocabWordType[]`
2. Import and spread into `genki1Vocab` array in `src/data/genki1/index.ts`
3. Update the chapter list in `src/components/ChapterSelect.tsx` (currently hardcoded `[1, 2, 3]`)

Each word needs: `id`, `chapter`, `japanese` (kana), `kanji` (nullable), `meaning` (string array for multiple valid answers), `wordType`.

## Game flow

menu → chapterSelect → difficultySelect → game → summary

Difficulty controls fall duration in seconds: easy=30, medium=20, hard=10, extreme=5.
