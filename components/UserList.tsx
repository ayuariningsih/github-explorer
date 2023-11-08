"use client"

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, StarIcon } from '@heroicons/react/20/solid'
import SearchBar from './base/SearchBar'
import { EmptyUser } from '@/components'

const UserList = () => {
  function onSearch (queryParams: string) {
    console.log('search', queryParams)
  }

  return (
    <>
      <SearchBar
        placeholder="Search User"
        handleSearch={(val) => onSearch(val)}
      />
      
      <div className="p-6 my-4 max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow min-h-[500px]">
        <div className="mx-auto w-full max-w-xl rounded-2xl bg-white">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75">
                  <span className="font-bold">What is your refund policy?</span>
                  <ChevronUpIcon
                    className={`${
                      open ? 'rotate-180 transform' : ''
                    } h-5 w-5 font-bold`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm border border-gray-300 rounded-lg my-2">
                  <div className="flex justify-between">
                    <h6 className="font-bold text-gray-800 mb-2">Repo title</h6>
                    <div className="flex gap-2">
                      <h6 className="font-bold text-gray-800 mb-2">8</h6>
                      <StarIcon className="h-4 w-4 stroke-gray-800 stroke-2 fill-none" />
                    </div>
                  </div>
                  <hr />
                  <p className="text-gray-500 my-2">
                    If you're unhappy with your purchase for any reason, email us
                    within 90 days and we'll refund you in full, no questions asked.
                  </p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        
        <EmptyUser />
      </div>
    </>
  )
}

export default UserList