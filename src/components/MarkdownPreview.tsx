"use client"
import { useState } from 'react';

interface MarkdownPreviewProps {
    markdownText: string;
}

export default function MarkdownPreview({ markdownText }: MarkdownPreviewProps) {
    const [isPreview, setIsPreview] = useState(false);
    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    const togglePreview = async () => {
        if (!isPreview) {
            try {
                const response = await fetch('/api/markdown/preview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ markdownText }),
                });
                const data = await response.json();
                setHtmlContent(data.htmlContent);
            } catch (error) {
                console.error('プレビューの取得に失敗しました:', error);
            }
        }
        setIsPreview(!isPreview);
    };

    return (
        <div>
            <button
                type="button"
                onClick={togglePreview}
                className="text-gray-500"
            >
                {isPreview ? "戻る" : "プレビュー"}
            </button>
            {isPreview && htmlContent && (
                <div
                    className="mt-4 p-4 border rounded-md bg-gray-200"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            )}
        </div>
    );
}
