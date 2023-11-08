import React from 'react'
import Image from 'next/image'

const EmptyUser = () => {
  return (
    <div className="w-max-xl p-8">
      <Image
        className="mx-auto"
        src='/github-logo.png'
        width={118}
        height={118}
        alt="empty user"
      />

      <h6 className="text-center font-bold my-5">Search GitHub User</h6>
    </div>
  )
}

export default EmptyUser