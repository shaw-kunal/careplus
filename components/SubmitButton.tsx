import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface ButtonProp{
    isLoading:boolean,
    className?:string,
    children:React.ReactNode
}

const SubmitButton = ({isLoading,className, children}:ButtonProp) => {
  return (
    <Button type="submit" disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
      {
        isLoading 
        ? (
      <div className='flex items-center gap-4'>
        <Image   
        src={'/icons/pending.svg'}
        alt="loading"
        width={24}
        height={24}
        className='animate-spin'
        />
        loading...
      </div>

        )
        : children
      }
    </Button>
  )
}

export default SubmitButton
