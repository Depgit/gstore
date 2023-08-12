import dotenv from 'dotenv';
import core from 'core';
import Config from './config/config.js';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

(async () => {
    try {
        await Config.Init('.');
    } catch (err) {
        console.error('Got error while initializing config file.', err);
        process.exit(1);
    }
})();
