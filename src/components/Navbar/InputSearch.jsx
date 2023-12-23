'use client';

import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation"
import { useRef } from "react"

const InputSearch = () => {
    const searchRef = useRef()
    const router = useRouter()
    const handleSearch = (event) => {
        event.preventDefault();
        const keyword = searchRef.current.value;
        if (keyword.trim() == "") {
            router.push(`/`)
        }else{
            router.push(`/search/${keyword}`)
        }
        
    }
    return (<div className="flex flex-1 md:w-auto w-full">
            <div className="relative block md:w-auto w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <MagnifyingGlass className="w-5 h-5 fill-gray-400" size={32} />
                </div>
                <form onSubmit={handleSearch}>
                <input type="text" id="search-navbar" className="block w-full md:p-2 p-3 md:ps-10 ps-10 md:text-lg text-xl text-body border border-gray-600  bg-page rounded-lg placeholder-gray-400 focus:bg-white focus:text-black transition-all" placeholder="Search..." ref={searchRef} />
                </form>
            </div>
        </div>
        )
}

export default InputSearch