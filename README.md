# Color Guesser

A web-based color memory game. Memorize a color, then reproduce it using HSL sliders. Score is based on CIEDE2000 color difference.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Game Flow

```
start → memorize → guess → results → memorize (next round)
                                         ↓
                                     final → highscores
```

- **Memorize**: Watch a color sequence, then memorize the target color
- **Guess**: Reproduce the color using HSL sliders (hue, saturation, lightness)
- **Score**: CIEDE2000 delta-E based, max 100.0 per round, 3 rounds per game
- **High Scores**: Save your score with a 3-4 character player tag (uppercase alphanumeric). Persisted locally via Zustand + localStorage.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm test` | Run tests (Jest) |
| `npm run lint` | Run ESLint |

## Tech Stack

- **Framework**: Next.js 16 (Turbopack)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **State**: Zustand with persist middleware
- **Color**: chroma-js (delta-E scoring)
- **Testing**: Jest + Testing Library
