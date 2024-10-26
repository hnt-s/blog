"use server"

// 共通のAPIリクエスト
const fetchAPI = async (url: string, options: RequestInit) => {
    const apiUrl = process.env.API_URL

    if (!apiUrl) {
        return { success: false, error: "API URLが設定されていません" }
    }

    try {
        const response = await fetch(`${apiUrl}${url}`, options)

        if (!response.ok) {
            return { success: false, error: "APIでエラーが発生しました" }
        }

        // Content-Type ヘッダーが application/json の場合のみ、JSON を解析する
        const contentType = response.headers.get("Content-Type")
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json()
            return { success: true, data }
        }

        // データなしで成功を返す
        return { success: true }
    } catch (error) {
        console.error(error)
        return { success: false, error: "ネットワークエラーが発生しました" }
    }
}

export interface BlogType {
    _id: string
    title: string
    tags: [string]
    content: string
    description: string
    date: string
}

// 投稿一覧取得
export const getBlogList = async () => {
    const options: RequestInit = {
        method: "GET",
        cache: "no-store",
    }

    // 投稿一覧取得
    const result = await fetchAPI("/api/blog/read", options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, blogs: [] }
    }

    const blogs: BlogType[] = result.data

    return { success: true, blogs }
}

// 投稿詳細取得
export const getBlogDetail = async ({ id }: { id: string }) => {
    const options: RequestInit = {
        method: "GET",
        cache: "no-store",
    }

    // 投稿詳細取得
    const result = await fetchAPI(`/api/blog/read/${id}/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, blog: null }
    }

    const blog: BlogType = result.data

    return { success: true, blog }
}

interface CreateBlogType {
    accessToken: string
    title: string
    tag: string
    content: string
}

// 新規投稿
export const createBlog = async ({
    accessToken,
    title,
    tag,
    content,
}: CreateBlogType) => {
    const body = JSON.stringify({
        title: title,
        content: content,
        tag: tag,
    })

    const options = {
        method: "POST",
        headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "application/json",
        },
        body,
    }

    // 新規投稿を送信
    const result = await fetchAPI("/api/blogs/", options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, blog: null }
    }

    const blog: BlogType = await result.data

    return { success: true, blog }
}

interface UpdateBlogType {
    accessToken: string
    blogId: string
    title: string
    tag: string
    content: string
}

// 投稿編集
export const updateBlog = async ({
    accessToken,
    blogId,
    title,
    content,
    tag,
}: UpdateBlogType) => {
    const body = JSON.stringify({
        title: title,
        content: content,
        tag: tag,
    })

    const options = {
        method: "PATCH",
        headers: {
            Authorization: `JWT ${accessToken}`,
            "Content-Type": "application/json",
        },
        body,
    }

    // 投稿編集を送信
    const result = await fetchAPI(`/api/blogs/${blogId}/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

interface DeleteBlogType {
    accessToken: string
    blogId: string
}

// 投稿削除
export const deleteBlog = async ({ accessToken, blogId }: DeleteBlogType) => {
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
    }

    // 投稿削除を送信
    const result = await fetchAPI(`/api/blogs/${blogId}/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}