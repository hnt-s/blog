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
export const getPostList = async () => {
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
export const getPostDetail = async ({ id }: { id: string }) => {
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

// タグ絞り込み
export const getTagPosts = async ({ tags }: { tags: string }) => {
    const options: RequestInit = {
        method: "GET",
        cache: "no-store",
    }
    //タグ絞り込み
    const result = await fetchAPI(`/api/blog/read/${tags}/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, blog: null }
    }

    const blogs: BlogType[] = result.data

    return { success: true, blogs }
}

interface CreateBlogType {
    title: string
    description: string
    tags: string[]
    content: string
    date: string
}

// 新規投稿
export const createBlog = async ({
    title,
    description,
    tags,
    content,
    date,
}: CreateBlogType) => {
    const body = JSON.stringify({
        title: title,
        description: description,
        content: content,
        tag: tags,
        date: date,
    })

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    }

    // 新規投稿を送信
    const result = await fetchAPI("/api/blog/create", options)

    if (!result.success) {
        console.error(result.error)
        return { success: false, blog: null }
    }

    const blog: BlogType = await result.data

    return { success: true, blog }
}

interface UpdateBlogType {
    _id: string
    title: string
    description: string
    tags: string[]
    content: string
}

// 投稿編集
export const updateBlog = async ({
    _id,
    title,
    description,
    tags,
    content,
}: UpdateBlogType) => {
    const body = JSON.stringify({
        _id,
        title: title,
        description: description,
        tags: tags,
        content: content,
    })

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body,
    }

    // 投稿編集を送信
    const result = await fetchAPI(`/api/blog/update/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}

interface DeleteBlogType {
    _id: string
}

// 投稿削除
export const deleteBlog = async ({ _id }: 
    DeleteBlogType) => {
        const body = JSON.stringify({
            _id,
        })
        
    const options = {
        method: "DELETE",
        headers: {},
        body,
    }

    // 投稿削除を送信
    const result = await fetchAPI(`/api/blog/delete/`, options)

    if (!result.success) {
        console.error(result.error)
        return { success: false }
    }

    return { success: true }
}