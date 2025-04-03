import CreatePost from '@/components/CreatePost'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

export default async function Home() {

    const user = await currentUser()

    return (
        <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
            <div className='lg:col-span-6'>
                {user && <CreatePost />}
            </div>
            <div className='hidden lg:block lg:col-span-4 sticky top-20'>
                Who To Follow
            </div>
        </div>
    )
}

