"use client"
import { useState } from "react"

interface PreviewToggleProps {
    htmlContent: string
}

export default function PreviewToggle({ htmlContent }: PreviewToggleProps) {
    const [isPreview, setIsPreview] = useState(false)

    // プレビューのトグル
    const togglePreview = () => {
        setIsPreview(!isPreview)
    }

    return (
        <div>
            <button
                type="button"
                onClick={togglePreview}
                className="text-gray-500"
            >
                {isPreview ? "戻る" : "プレビュー"}
            </button>
            {isPreview && (
                <div
                    className="mt-4 p-4 border rounded-md bg-gray-200"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
            )}
        </div>
    )
}
