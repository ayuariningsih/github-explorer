
import { MouseEventHandler } from "react"

export interface SearchBarProps {
  placeholder?: string
  handleSearch: (e:any) => void
}

export interface CustomButtonProps {
  title: string
  containerStyles?: string
  handleClick?: MouseEventHandler<HTMLButtonElement>
  btnType?: 'button' | 'submit'
  textStyles?: string
  rightIcon?: any
}