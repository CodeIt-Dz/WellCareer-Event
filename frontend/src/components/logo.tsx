import Link from 'next/link'
import React from 'react'
import Image from "next/image";


const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="logo" width={205} height={45} />
    </Link>
  )
}

export default Logo
