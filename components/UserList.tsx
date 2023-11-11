"use client"

import SearchBar from './base/SearchBar'
import { EmptyUser, List, Loading } from '@/components'
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
  const [loading, setLoading] = useState(false)

  async function getUsers (params: string) {
    setUsers([])
    setLoading(true)

    const { userCount, nodes, pageInfo } = await fetchUsersWithGrphql(params)
    await setUsers(nodes)
    await setUserCount(userCount)

    setLoading(false)
  }
  
  return (
    <>
      <SearchBar
        placeholder="Search User"
        handleSearch={(val) => getUsers(val)}
      />
      
      <div className="px-6 my-4 py-10 max-w-xl mx-auto bg-white border border-gray-300 rounded-lg shadow min-h-[300px]">
        { !loading && userCount === 0
        ? (<EmptyUser text={users.length === 0 ? 'No Data Found' : undefined} />)
        : (<List userCount={userCount} users={users} />)
        }

        { loading && (
          <Loading />
        )}
      </div>
    </>
  )
}

export default UserList