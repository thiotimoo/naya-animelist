"use client"
import { Bookmark, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import React, { useState } from 'react'

const CollectionButton = ({ anime_mal_id, user_email, anime_image, anime_title, initial }) => {
    const [isCreated, setIsCreated] = useState(initial?.anime_mal_id ?? false)
    const handleCollection = async (event) => {
        event.preventDefault()
        const data = { anime_mal_id, user_email, anime_image, anime_title }
        if (!isCreated) {
            const response = await fetch('/api/v1/collection', {
                method: 'POST',
                body: JSON.stringify(data)
            })

            const collection = await response.json()
            if (collection?.status == 200) {
                setIsCreated(collection.isCreated)
            }
        } else {
            const response = await fetch('/api/v1/collection', {
                method: 'DELETE',
                body: JSON.stringify(data)
            })

            const collection = await response.json()
            if (collection?.status == 200) {
                setIsCreated(!collection.isDeleted)
            }
        }
    }
    return (
        <>
            {isCreated ?
                <button onClick={handleCollection} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-lg px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 flex flex-row justify-center items-center gap-2 w-full">
                    <CheckCircle size={32} weight="bold" /> Added To Collection</button>
                :
                <button onClick={handleCollection} type="button" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-2xl text-lg px-5 py-2.5 dark:bg-pink-600 dark:hover:bg-pink-700 focus:outline-none dark:focus:ring-pink-800 flex flex-row justify-center items-center gap-2 w-full">
                    <Bookmark size={32} weight="bold" /> Add To Collection</button>
            }
        </>
    )
}

export default CollectionButton