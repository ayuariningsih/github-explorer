import axios from 'axios'

const BASE_URL = 'https://api.github.com/graphql'
const ACCESS_TOKEN = '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'

export async function fetchUsersWithGrphql(query:string) {
  const fetchUrl = axios({
    url: BASE_URL,
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