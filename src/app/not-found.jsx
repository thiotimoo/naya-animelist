"use client"
import { FlyingSaucer } from "@phosphor-icons/react/dist/ssr"
import { useRouter } from "next/navigation"

const Page = () => {
    const router = useRouter()
    return (
        <div className="m-auto flex justify-center items-center flex-col gap-6">
            <FlyingSaucer size={128} />
            <h3 className="font-bold text-5xl text-center">404 | NOT FOUND</h3>
            <button onClick={router.back} className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800" href="/">Return to previous page</button>
        </div>
    )
}

export default Page