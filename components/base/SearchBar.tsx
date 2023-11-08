"use client"

import { SearchBarProps } from "@/types"
import { CustomButton } from ".."
import { MagnifyingGlassIcon} from '@heroicons/react/20/solid'
import { useState } from "react"

const SearchBar = ({ placeholder, handleSearch }: SearchBarProps) => {
  const [input, setInput] = useState('')

  return (
    <div className="flex xl:flex-row flex-col gap-2 max-w-xl mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>

        <input
          className="block w-full px-4 py-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-gray-400"
          type="text"
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <CustomButton
        title="Search"
        containerStyles="bg-green-600 text-white text-sm font-medium rounded-lg"
        rightIcon={<MagnifyingGlassIcon
          className="h-5 w-5 text-white align-middle cursor-pointer ml-2"
          aria-hidden="true"
        />}
        handleClick={() => handleSearch(input)} />
    </div>
  )
}

export default SearchBar