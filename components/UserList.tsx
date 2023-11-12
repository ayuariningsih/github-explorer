"use client"

import SearchBar from './base/SearchBar'
import { CustomButton, EmptyUser, List, Loading } from '@/components'
import { fetchUsersWithGrphql, updateSearchParams } from '@/utils'
import { useState } from 'react'
import { useRouter } from "next/navigation"
import { Params, UsersNode } from '@/types'

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

  const initialParams = {
    name: '',
    limit: 0,
    after: ''
  }

  const router = useRouter()
  const [users, setUsers] = useState<UsersNode[]>(initialUsers)
  const [userCount, setUserCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useState(initialParams)
  const [hasNext, setHasNext] = useState(false)

  async function getUsers (params: Params, isShowMore = false) {
    if (!isShowMore) setUsers([])
    setLoading(true)

    const { userCount, nodes, pageInfo } = await fetchUsersWithGrphql(params)
    
    if (isShowMore) await setUsers([...users, ...nodes])
    else await setUsers(nodes)
    
    await setUserCount(userCount)
    await setHasNext(pageInfo.hasNextPage)
    await setSearchParams({...params, after: pageInfo.endCursor})
    
    const newPathname = updateSearchParams(searchParams)
    router.push(newPathname)

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
        : (
            <>
              <List userCount={userCount} users={users} />
              { hasNext && !loading && (
                <CustomButton
                  title="Show More"
                  btnType="button"
                  containerStyles="mx-auto mt-5 border border-green-600 bg-white text-green-600 text-sm font-bold rounded-lg hover:bg-green-200/50"
                  handleClick={() => getUsers(searchParams, true)} />
              )}
            </>
          )
        }

        { loading && (
          <Loading />
        )}
      </div>
    </>
  )
}

export default UserList