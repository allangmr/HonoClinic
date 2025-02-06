import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = () => {
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href="/">
                <Image 
                    src="/assets/icons/logo-full.svg" 
                    alt="HonoClinic Logo" 
                    width={1000} 
                    height={1000} 
                    className="mb-12 h-10 w-fit" 
                />
            </Link>
            <section className='flex flex-col items-center'>
                <Image 
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                />
            </section>
            <h2 className='header mb-6 max-w-[600px] text-center'>
                Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
            </h2>
        </div>
    </div>
  )
}

export default Success