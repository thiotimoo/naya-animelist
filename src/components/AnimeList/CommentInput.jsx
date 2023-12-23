"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

const CommentInput = ({ anime_mal_id, user_email, username, anime_title }) => {
    const [comment, setComment] = useState('');
    const [isCreated, setIsCreated] = useState(false);

    const router = useRouter();

    const handleInput = (event) => {
        setComment(event.target.value)
    }

    const handleComment = async (event) => {
        event.preventDefault()
        if (comment.trim() == '') return;
        const data = { anime_mal_id, user_email, comment, username, anime_title }
        const response = await fetch('/api/v1/comment', {
            method: 'POST',
            body: JSON.stringify(data)
        })

        const postComment = await response.json()
        if (postComment?.status == 200) {
            setIsCreated(true)
            setComment("")
            router.refresh()
        }
    }

    return (
        <div>

            <form>
                <div className="w-full mb-4 border-none mt-2">
                    <div className="px-4 py-2 bg-zinc-900 rounded-lg ">
                        <label htmlFor="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" className="w-full px-0 text-md focus:ring-0 outline-none bg-zinc-900 border-none" placeholder="Write a comment..." onChange={handleInput} value={comment} required></textarea>
                    </div>
                    <div className="flex items-center justify-end px-3 py-2 ">
                        <button type="submit" className="inline-flex items-center py-2.5 px-4 text-md font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={handleComment}>
                            Post comment
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default CommentInput