import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <div>
      <Link className='text-3xl text-white' href={"/qoshish"}>Admin</Link>
    </div>
  )
}
