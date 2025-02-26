import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = () => {
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='flex flex-col items-center space-y-4'>
            <Link href="/" className='cursor-pointer'>
                <Image 
                    src="/assets/icons/logo-full.svg"
                    alt='Logo'
                    width={162}
                    height={32}
                    className='h-8 w-fit-content'
                />
            </Link>
        </header>
    </div>
  )
}

export default Admin