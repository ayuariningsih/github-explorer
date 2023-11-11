
import { MouseEventHandler } from "react"

export interface SearchBarProps {
  placeholder?: string
  handleSearch: (input:string) => void
}

export interface CustomButtonProps {
  title: string
  containerStyles?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  btnType?: 'button' | 'submit'
  textStyles?: string
  rightIcon?: any
}

// export interface SearchResult {
//   userCount: number
//   pageInfo: PageInfo
//   nodes: UsersNode[]
// }

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface UsersNode {
  id: string
  login: string
  repositories: Repositories
}

export interface Repositories {
  totalCount: number
  nodes: ReposNode[]
}

export interface ReposNode {
  id: string
  name: string
  description?: string
  stargazerCount: number
}