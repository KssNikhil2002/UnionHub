import { auth } from "@/auth";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className='mb-12 mt-28 sm-mt-40 flex flex-col items-center justify-center text-center'>
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border
          border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-400 hover:bg-white/50">
            <p className="text-sm font-semibold text-gray-700">
              Welcome to UnionHub 
            </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Your one stop app for all <span className='text-green-700'>Union</span> Operations
        </h1>
        <p className='mt-5 max-w-prose text-zinc-700 sm:text-lg'>
          UnionHub is a platform that helps you manage and automate all your union operations in one place.
        </p>

        <Link className={buttonVariants({size:'lg', className:'mt-5 bg-green-700'})} href='/Register'>
          Get Started <ArrowRight className="ml-1 h-5 w-5"/>
        </Link>
      </MaxWidthWrapper>

    
      <div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div>
                <Image src='/next.svg'
                alt="product preview"
                width={1364}
                height={866}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md-p-20 shadow-2xl ring-1 ring-gray-900/10"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      

    </>
  );
}