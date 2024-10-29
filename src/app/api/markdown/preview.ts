// /app/api/markdown/preview.ts
import { NextResponse } from 'next/server';
import markdownToHtml from 'zenn-markdown-html';

export async function POST(request: Request) {
    const { markdownText } = await request.json();
    const htmlContent = markdownToHtml(markdownText);
    return NextResponse.json({ htmlContent });
}
