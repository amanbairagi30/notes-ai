import { SignIn } from '@clerk/nextjs'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'NotesAI - Sign In',
}

export default function SignInPage() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <SignIn appearance={{ variables: { colorPrimary: "#0F172A" } }} />
        </div>
    )
}
