
import { MouseEventHandler } from "react"

export interface SearchBarProps {
  placeholder?: string
  handleSearch: (input:Params) => void
}

export interface Params {
  name: string
  limit: number
  after: string
}

export interface CustomButtonProps {
  title: string
  containerStyles?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  btnType?: 'button' | 'submit'
  textStyles?: string
  rightIcon?: any
}

export interface UserList {
  userCount: number
  users: UsersNode[]
}

export interface PageInfo {
  hasNextPage: boolean
  endCursor: string
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