import React from 'react'
import Network from "../../public/NetworkError.avif"


function NetworkError() {
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
          <img src={Network} alt="" />
    </div>
  )
}

export default NetworkError