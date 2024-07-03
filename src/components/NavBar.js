import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { auth } from '@/auth'
import LogOutButton from './LogOutButton'


export default async function NavBar() {
    const session = await auth();

  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
        <MaxWidthWrapper>
            <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                {session?.user ? (
                    <div className='flex z-40 font-semibold'>
                    <span>UnionHub</span>
                    </div>
                ) : (
                    <Link href='/' className='flex z-40 font-semibold'>
                    <span>UnionHub</span>
                    </Link>
                )
                
                }

                {/* to do: add mobile view */}

                <div className='hidden items-center space-x-4 sm:flex'>
                    <>
                        {session?.user ? (
                            <LogOutButton/>
                        ):(
                            <>
                            <Link href='/login' className={buttonVariants({
                                variant: 'ghost',
                                size: 'sm',
                            })}>
                                Login
                            </Link>
                            <Link className={buttonVariants({size:'sm', className:' bg-green-700'})} href='/Register'>
                                Get Started <ArrowRight className="ml-1 h-4 w-5"/>
                            </Link>
                            </>
                        )}
                    </>
                </div>
            </div>
        </MaxWidthWrapper>
    </nav>
  )
}