'use client'
import { signOut } from 'next-auth/react'
export default async function Admin() {
    const handleLogout = () => {
        signOut({ callbackUrl: '/login'})
    }
    
    return (
        <div>
            <h1>Blog Tree 管理者ページ</h1>
            
        </div>
    );
}