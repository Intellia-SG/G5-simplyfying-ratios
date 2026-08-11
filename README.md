# Simplifying Ratios — Intellia Global Grade 5 Math

Interactive Grade 5 module teaching ratio notation, equivalent ratios, and
simplifying ratios to lowest terms using bar models and GCF reasoning.
Aligned with the Singapore MOE Primary 5 Mathematics curriculum.

Built to match the `equal-groups-main` reference architecture exactly:
same five-phase structure, component library, audio pipeline, and design
system — content and topic only differ.

## Five-phase structure

1. **Wonder** — 5 real-world ratio puzzles that hook curiosity
2. **Story** — Leo & Aria's smoothie/paint mixing story, 4 narrated slides
3. **Simulate** — 3 hands-on stations: Ratio Scaler, Simplifier Lab, Ratio Sentence
4. **Practice** — 10 worlds × 100 procedurally generated questions across
   Guided, Independent, Timed, and Boss Battle modes
5. **Reflect** — takeaways, badges, and score summary

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build
npm run preview     # preview the production build
```

## Narration audio

Narration lines are mapped in `src/utils/audioMap.js` but the `.mp3` files
themselves are **not included** — they're generated via ElevenLabs (Alice
voice, `eleven_multilingual_v2`) and are not checked into this zip. To
generate them:

1. Add `VITE_ELEVENLABS_API_KEY=your_key` to a `.env` file
2. Run `npm run generate-audio`

Without generated audio, the module still runs normally — `playNarration`
silently no-ops when a clip is missing (see `src/utils/audio.js`).

## Story slide artwork

`src/features/story/StoryPhase.jsx` imports 4 images directly from
`src/assets/story/1.png` … `4.png`. This zip ships **placeholder artwork**
generated at the exact production size so the build compiles and the layout
is final — swap these files for finished illustrations with no code or
layout changes required.

- **Size:** 1920 × 800 px (landscape, ~2.4:1)
- **Displayed frame:** 660 × 210 px desktop, `object-fit: cover`
  (scales down to 175px height on tablet, 140px on mobile — see
  `.story-image-full` in `src/styles/globals.css`)
- Because the frame is a different aspect ratio than the source (≈3.1:1
  frame vs. 2.4:1 source), `cover` will crop some of the top/bottom —
  keep the important subject matter centered vertically.

| Slide | Scene |
|---|---|
| 1 | Leo's Smoothie Shop — 6 strawberries : 9 blueberries |
| 2 | Equal groups — 6:9 simplifying to 2:3 |
| 3 | Aria's paint mural — 12:16 simplifying to 3:4 via GCF |
| 4 | Leo & Aria celebrate — ready to practice |
