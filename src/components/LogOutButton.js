'use client'
import React from 'react'
import Link from 'next/link'
import SignOut from '@/app/actions/signout'
import { useRouter } from 'next/navigation'
import { Button, buttonVariants } from './ui/button'
export default function LogOutButton() {

    const router = useRouter();

    const handleSignOut = async () => {
        const result = await SignOut();
        router.push('/login');
        router.refresh();
        return result;
    }
  return (
    <Button onClick={handleSignOut} type='submit' className="bg-green-700 text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"> Logout </Button>
  )
}
