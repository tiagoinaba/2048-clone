import React from 'react'

export default function SmallScreen() {
  return (
    <div className='max-[520px]:flex bg-basic hidden max-[520px]:inset-0 text-center flex-col justify-center max-[520px]:fixed'>
      <h2 className='text-2xl font-bold m-0'>Your screen is too small</h2>
      <p className='text-xl m-0'>Move to a larger device to play</p>
    </div>
  )
}
