import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const directoryPath = path.join(process.cwd(), 'public', 'images', 'hero');
        const allEntries = await fs.readdir(directoryPath, { withFileTypes: true });
        const imageFileRegex = /\.(png|jpe?g|gif|bmp|webp|svg)$/i;

        const images = allEntries
            .filter((entry) => entry.isFile() && imageFileRegex.test(entry.name))
            .map((entry) => `/images/hero/${entry.name}`)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error reading hero images:', error);
        return NextResponse.json({ images: [] }, { status: 200 });
    }
}


