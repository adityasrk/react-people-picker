// Copies the hand-written type declarations into dist/ after the rollup build.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '..', 'src', 'PeoplePicker', 'index.d.ts');
const destDir = path.join(__dirname, '..', 'dist');
const dest = path.join(destDir, 'index.d.ts');

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(src, dest);
