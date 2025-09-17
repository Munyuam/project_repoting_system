import React from 'react'

function cancelNav() {
  return (
   <div className='bg-white shadow-sm border-b px-8 py-4'>
      <div className='flex justify-end items-center space-x-4'>
        <button className='text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg transition-colors'
          title='Cancel'>
            <i class='bxr  bx-cog bx-sm'  ></i> 
        </button>
      </div>
    </div>  
    )
}

export default cancelNav