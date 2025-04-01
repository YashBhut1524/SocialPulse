import ModeToggle from '@/components/ModeToggle'
import { Button } from '@/components/ui/button'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
} from '@clerk/nextjs'
import React from 'react'

export default async function Home() {
    return (
        <div className='m-4'>
            <h1>Home Page</h1>
        </div>
    )
}

