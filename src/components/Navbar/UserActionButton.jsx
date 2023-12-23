import { authUserSession } from '@/app/libs/auth-libs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserActionButton = async () => {
    const user = await authUserSession()

    return (
        <>
            {user ?
                // <Link href="/api/auth/signout" className="">Sign Out</Link>
                <Link href="/users/dashboard">
                    <Image src={user.image} className='rounded-full bg-zinc-800 h-14 w-14' width={150} height={150}/>
                </Link>
                
                :
                <Link href="/api/auth/signin" className="">Sign In</Link>
            }
        </>
    )
}

export default UserActionButton