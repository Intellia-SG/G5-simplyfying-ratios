// scripts/clean_audio.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { audioMap } from '../src/utils/audioMap.js';

const audioDir = path.join(__dirname, '../public/assets/audio');
if (fs.existsSync(audioDir)) {
  const referencedFiles = new Set(Object.values(audioMap).map(p => path.basename(p)));
  const files = fs.readdirSync(audioDir);
  files.forEach(file => {
    if (!referencedFiles.has(file)) {
      console.log(`Removing unreferenced audio asset: ${file}`);
    }
  });
}
