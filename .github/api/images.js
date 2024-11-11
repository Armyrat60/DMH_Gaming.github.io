import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function handler(req, res) {
    const { type, game } = req.query;
    let imagePath;

    if (type === 'hero') {
        imagePath = path.join(process.cwd(), 'public/assets/hero');
    } else if (type === 'games' && game) {
        imagePath = path.join(process.cwd(), 'public/assets/games', game);
    } else {
        return res.status(400).json({ error: 'Invalid request' });
    }

    try {
        const files = fs.readdirSync(imagePath)
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/assets/${type}${game ? '/' + game : ''}/${file}`);
        
        res.json(files);
    } catch (error) {
        console.error('Error reading images:', error);
        res.status(500).json({ error: 'Failed to load images' });
    }
}