import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <footer className="flex justify-center bg-slate-800 p-8 absolute inset-x-0 bottom-0">
        <Image 
            className="dark:invert"
            src={'/next.svg'}
            alt="next-logo"
            width={85}
            height={24}
        />
        <p className="text-white mx-2 text-lg">/</p>
        <Image 
            className="dark:invert"
            src={'/vercel.svg'}
            alt="versel-logo"
            width={85}
            height={24}
        />
    </footer>
  )
}

export default Footer