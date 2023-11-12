import { Params } from '@/types'
import axios from 'axios'

const API_URL = process.env.API_URL
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export async function fetchUsersWithGrphql(params: Params) {
  const query = params.name
  const limit = params.limit || 5
  const after = params.after || null

  const fetchUrl = axios({
    url: API_URL,
    method: 'post',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    },
    data: {
      query: /* GraphQL */ `
        query GetUsers($query:String!, $limit:Int, $after:String) {
          search(query: $query, type: USER, last: $limit, after: $after ){
            userCount,
            pageInfo {
              hasNextPage,
              endCursor,
            },
            nodes {
              ... on User {
                id,
                login,
                repositories(last: 10) {
                  totalCount,
                  nodes {
                    id,
                    name,
                    description,
                    stargazerCount 
                  }
                }
              }
            }
          }
        }
      `,
      variables: { query, limit, after }
    }
  })

  try {
    const { data: { data: { search }}} = await fetchUrl

    return search
  } catch (error) {
    console.error(error)
  }
}

export const updateSearchParams = (params: Params) => {
  const searchParams = new URLSearchParams(window.location.search)

  Object.entries(params).map(([key, value]) => searchParams.set(key, value))

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname
}