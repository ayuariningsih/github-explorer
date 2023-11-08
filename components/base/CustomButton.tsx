"use client"

import { CustomButtonProps } from '@/types'

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon }: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      className={`flex flex-row relative justify-center items-center py-2.5 px-5 ${containerStyles}`}
      onClick={ handleClick }
    >
      <span className={`flex ${textStyles}`}>
        { title }
      </span>

      { rightIcon }
    </button>
  )
}

export default CustomButton