
'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import AuthProvider from "@/components/AuthProvider"

interface FormData {
    email: string;
    password:string;
}

export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {

        await signIn('credentials', {
            redirect: false,  // 自動的にリダイレクトしないようにする
            email: data.email,
            password: data.password,
        })
        .then((result) => {
            if (result?.error) {
                // エラーがある場合、エラーメッセージを表示
                toast.error("ログインに失敗しました")
            } else {
                // 管理者ページにリダイレクト
                console.log(result)
                window.location.href = "/admin"
                console.log("ok")
            }
        })
    }

    return (
        <AuthProvider>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <div className='w-full rounded-lg bg-gray-50 pt-6 pb-4 px-6'>
                <div>
                    <label htmlFor='email' className='block mb-2 text-gray-800'>Email</label>
                    <input
                        {...register('email', { required: 'メールアドレスは必須です' })}
                        className='block w-full rounded-md border border-gray-200 pl-2 py-2 outline-2'
                        id='email'
                        type='email'
                        name='email'
                        placeholder='メールアドレス'
                        required
                    />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className='mt-4'>
                    <label htmlFor='password' className='block mb-2 text-gray-800'>Password</label>
                    <input
                        {...register('password', { required: 'パスワードは必須です' })}
                        className='block w-full rounded-md border border-gray-200 pl-2 py-2 outline-2'
                        id='password'
                        type='password'
                        name='password'
                        placeholder='パスワード'
                        required
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                
                <button className='mt-8 w-full rounded-lg bg-blue-500 text-white h-10 hover:bg-blue-400 focus-visible:outline-offset-2'>ログイン</button>
                
            </div>
        </form>
        </AuthProvider>
    );
}
