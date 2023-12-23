import React from 'react'

const Footer = () => {
    return (
        <div className='text-xl text-body text-center w-full p-6  flex flex-col max-w-screen-lg mx-auto'>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <h3>
                ✨ Created by <span className='font-bold bg-secondary text-black px-2'>@thio.timoo</span>
            </h3>
            <h3>
                Powered by <b>Jikan.moe API</b>
            </h3>
        </div>
    )
}

export default Footer