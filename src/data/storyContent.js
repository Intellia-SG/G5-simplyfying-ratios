// src/data/storyContent.js
// 4-panel educational story for Simplifying Ratios featuring English characters (Leo & Aria)

export const STORY_PANELS = [
  {
    panel: 0,
    title: "Leo's Smoothie Shop 🍓🫐",
    text: "Leo runs a popular juice bar in Sunnyside Town. For the big summer festival, he prepares a giant batch with 24 ripe strawberries and 36 plump blueberries! Leo wonders: 'What is the simplest ratio of strawberries to blueberries?'",
    character: "Leo",
    imageEmoji: "🥤",
    imageBg: "linear-gradient(135deg, #1a237e 0%, #283593 100%)",
    imageScene: "smoothie_shop",
    highlight: "24 Strawberries : 36 Blueberries",
  },
  {
    panel: 1,
    title: "Finding Equal Groups ⚖️",
    text: "Leo starts arranging the fruit into equal trays. He finds that 12 is the Greatest Common Factor of 24 and 36! That means 24 strawberries make 12 pairs of 2, and 36 blueberries make 12 groups of 3.",
    character: "Leo",
    imageEmoji: "🧺",
    imageBg: "linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)",
    imageScene: "sorting_trays",
    highlight: "GCF = 12",
  },
  {
    panel: 2,
    title: "The Simplest Form 🎨",
    text: "Aria, a mural painter, stops by! She explains: 'When you divide both numbers by their Greatest Common Factor (12), 24 ÷ 12 = 2 and 36 ÷ 12 = 3. So the simplest ratio is 2 to 3! Both quantities keep the exact same proportion.'",
    character: "Aria",
    imageEmoji: "🎨",
    imageBg: "linear-gradient(135deg, #01579b 0%, #0277bd 100%)",
    imageScene: "ratio_chart",
    highlight: "24 : 36 ➔ 2 : 3",
  },
  {
    panel: 3,
    title: "Ratio Mastery Unlocked! ✨",
    text: "Leo and Aria are thrilled! With the simplified ratio of 2 : 3, Leo can scale his smoothie recipe to make 5 cups, 50 cups, or 500 cups without ever changing the delicious balanced taste! 'Let's practice simplifying more ratios!'",
    character: "Leo & Aria",
    imageEmoji: "✨",
    imageBg: "linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)",
    imageScene: "celebration",
    highlight: "Ready to Simulate!",
  },
];
