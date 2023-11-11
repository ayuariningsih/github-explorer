import axios from 'axios'

const API_URL = process.env.API_URL
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

export async function fetchUsersWithGrphql(query:string) {
  const fetchUrl = axios({
    url: API_URL,
    method: 'post',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`
    },
    data: {
      query: /* GraphQL */ `
        query GetUsers($query:String!) {
          search(query: $query, type: USER, first: 5){
            userCount,
            pageInfo {
              hasNextPage,
              hasPreviousPage,
            },
            nodes {
              ... on User {
                id,
                login,
                repositories(last: 100) {
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
      variables: { query }
    }
  })

  try {
    const { data: { data: { search }}} = await fetchUrl

    return search
  } catch (error) {
    console.error(error)
  }
}