// scripts/generate_audio.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { audioMap } from '../src/utils/audioMap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2';
const VOICE_MODEL = 'eleven_multilingual_v2';
const VOICE_SETTINGS = {
  celebration:   { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question:      { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis:      { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking:      { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement:     { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction:   { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
};

const phrases = [
  { text: "Hi! I'm Leo. Ready to explore and simplify ratios? Let's begin our journey!", style: 'celebration' },

  // Wonder
  { text: "The Big Smoothie Mystery!", style: 'celebration' },
  { text: "If a smoothie master mixes twenty-four strawberries and thirty-six blueberries into identical mini-cups, what is the simplest recipe ratio, and how many cups can they make?", style: 'question' },
  { text: "Let's investigate how finding common factors simplifies any ratio!", style: 'encouragement' },

  // Story
  { text: "Leo runs a popular juice bar in Sunnyside Town. For the big summer festival, he prepares a giant batch with 24 ripe strawberries and 36 plump blueberries! Leo wonders: 'What is the simplest ratio of strawberries to blueberries?'", style: 'statement' },
  { text: "Leo starts arranging the fruit into equal trays. He finds that 12 is the Greatest Common Factor of 24 and 36! That means 24 strawberries make 12 pairs of 2, and 36 blueberries make 12 groups of 3.", style: 'statement' },
  { text: "Aria, a mural painter, stops by! She explains: 'When you divide both numbers by their Greatest Common Factor (12), 24 divided by 12 equals 2 and 36 divided by 12 equals 3. So the simplest ratio is 2 to 3! Both quantities keep the exact same proportion.'", style: 'instruction' },
  { text: "Leo and Aria are thrilled! With the simplified ratio of 2 to 3, Leo can scale his smoothie recipe to make 5 cups, 50 cups, or 500 cups without ever changing the delicious balanced taste! Let's practice simplifying more ratios!", style: 'celebration' },

  // Simulate
  { text: "Station A: Sort the fruits into equal grouping baskets to find the simplest ratio! Watch the bar model update as you sort.", style: 'instruction' },
  { text: "Station B: Find the Greatest Common Factor chip and divide both terms step by step to find the simplest ratio.", style: 'instruction' },
  { text: "Station C: Move the scale multiplier slider. Watch how scaling changes both terms together while preserving the exact ratio!", style: 'instruction' },
  { text: "Station D: One of the simplification steps has an error! Can you spot the mistake and tap the incorrect term?", style: 'question' },

  { text: "Amazing! You simplified the ratio perfectly!", style: 'celebration' },
  { text: "Not quite! Check your common factors and try again.", style: 'encouragement' },

  // Play
  { text: "The Boss Battle begins! Answer the questions correctly with your 3 lives to defeat the boss!", style: 'emphasis' },
  { text: "Victory! You defeated the boss and claimed your Ratio Master reward!", style: 'celebration' },
  { text: "Excellent work! You completed this district!", style: 'celebration' },
  { text: "Amazing! You simplified it perfectly!", style: 'celebration' },
  { text: "Brilliant! That is exactly right!", style: 'celebration' },
  { text: "Superb! You know your common factors!", style: 'celebration' },
  { text: "Excellent! Ratio mastery at work!", style: 'celebration' },
  { text: "Perfect! That's in simplest form!", style: 'celebration' },
  { text: "Fantastic streak! Keep on rolling!", style: 'celebration' },
  { text: "Let's check the Greatest Common Factor again!", style: 'encouragement' },
  { text: "Hint: Find the greatest number that divides into both terms.", style: 'thinking' },
  { text: "Hint: Divide both terms by the GCF to reach the simplest integer ratio.", style: 'thinking' },

  // Reflect
  { text: "Take a moment to reflect on your learning and check your ratio mastery!", style: 'question' },
  { text: "Congratulations! You have mastered simplifying ratios, equal groups, and greatest common factors! You are a certified Ratio Master!", style: 'celebration' },
];

const audioDir = path.join(__dirname, '../public/assets/audio');
const phraseStyleByText = new Map(phrases.map((p) => [p.text, p.style]));

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const content = fs.readFileSync(filePath, 'utf8');
  return content.split(/\r?\n/).reduce((env, line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return env;
    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) return env;
    const key = trimmed.slice(0, equalsIndex).trim();
    let value = trimmed.slice(equalsIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
    return env;
  }, {});
}

function loadApiKey() {
  if (process.env.VITE_ELEVENLABS_API_KEY) return process.env.VITE_ELEVENLABS_API_KEY;
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;

  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const loaded = readEnvFile(path.join(process.cwd(), envFile));
    if (loaded.VITE_ELEVENLABS_API_KEY) return loaded.VITE_ELEVENLABS_API_KEY;
    if (loaded.ELEVENLABS_API_KEY) return loaded.ELEVENLABS_API_KEY;
  }
  return null;
}

async function generateAudioFile({ text, style, fileName }, apiKey) {
  const voiceSettings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
      accept: 'audio/mpeg',
    },
    body: JSON.stringify({
      text,
      model_id: VOICE_MODEL,
      voice_settings: voiceSettings,
      output_format: 'mp3_44100_128',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Failed to generate ${fileName}: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`);
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());
  await fs.promises.mkdir(audioDir, { recursive: true });
  await fs.promises.writeFile(path.join(audioDir, fileName), audioBuffer);
  console.log(`Wrote ${fileName}`);
}

async function main() {
  const apiKey = loadApiKey();
  if (!apiKey) {
    console.log('No API key found in .env.local. Skipping offline generation (live fallback will be used if provided in runtime).');
    return;
  }

  const entries = Object.entries(audioMap);
  console.log(`Generating ${entries.length} audio narration files...`);

  for (const [text, relativePath] of entries) {
    const fileName = path.basename(relativePath);
    const style = phraseStyleByText.get(text) || 'statement';
    try {
      await generateAudioFile({ text, style, fileName }, apiKey);
    } catch (err) {
      console.warn(`Failed generating ${fileName}:`, err.message);
    }
  }

  console.log('Audio generation completed.');
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
