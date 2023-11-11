"use client"

import clsx from 'clsx'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, StarIcon } from '@heroicons/react/20/solid'
import SearchBar from './base/SearchBar'
import { EmptyUser } from '@/components'
import { fetchUsersWithGrphql } from '@/utils'
import { useState } from 'react'
import { UsersNode } from '@/types'

const UserList = () => {
  const initialUsers = [{
    id: '',
    login: '',
    repositories: {
      totalCount: 0,
      nodes: [
        {
          id: '',
          name: '',
          description: '',
          stargazerCount: 0
        }
      ]
    }
  }]

  const [users, setUsers] = useState<UsersNode[]>(initialUsers)
  const [userCount, setUserCount] = useState(0)

  async function getUsers (params: string) {
    const { userCount, nodes, pageInfo } = await fetchUsersWithGrphql(params)
    await setUsers(nodes)
    await setUserCount(userCount)
  }
  
  return (
    <>
      <SearchBar
        placeholder="Search User"
        handleSearch={(val) => getUsers(val)}
      />
      
      <div className="px-6 my-4 py-10 max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow min-h-[300px]">
      { userCount > 0 
        ? users.map(({ id, login, repositories }, index) => (
          <div className="mx-auto w-full max-w-xl rounded-2xl bg-white mb-3" key={id || index}>
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={clsx(
                      'flex w-full justify-between rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-left text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-gray-500/75',
                      open && 'bg-green-100 border-green-500 hover:bg-green-200'
                    )}
                  >
                    <span className="font-bold">{ login }</span>
                    <ChevronDownIcon
                      className={clsx(
                        'h-5 w-5 font-bold',
                        open && 'rotate-180 transform'
                      )}
                    />
                  </Disclosure.Button>

                  { repositories && repositories.totalCount > 0 && repositories.nodes.map((repo) =>
                  (
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm border border-gray-300 rounded-lg my-2" key={repo.id}>
                      <div className="flex justify-between">
                        <h6 className="font-bold text-gray-800 mb-2">{ repo.name }</h6>
                        <div className="flex gap-2">
                          <h6 className="font-bold text-gray-800 mb-2">{ repo.stargazerCount}</h6>
                          <StarIcon className="h-4 w-4 stroke-gray-800 stroke-2 fill-none" />
                        </div>
                      </div>
                      <hr />
                      <p className="text-gray-500 my-2">
                       { repo.description ? repo.description : '-' }
                      </p>
                    </Disclosure.Panel>
                  ))}
                </>
              )}
            </Disclosure>
          </div>
        ))
        : (<EmptyUser />)}
      </div>
    </>
  )
}

export default UserList