import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface StatCardProps{
    type:string,
    count:number,
    label:string,
    icon:string,
    className?:string,
}

const StatCard = ({type,count,icon,label,className}:StatCardProps) => {
  return (
    <div className={clsx(`stat-card`,{
     "bg-appointments":type=== "appointments",
     "bg-pending":type === "pending",
     "bg-cancelled":type === "cancelled"
    })}>
        <div className='flex items-center gap-4'>
            <Image 
                   src={icon}
                   height={32}
                   width={32}
                   alt={label}
                   className="size-8 w-fit"
            />
           <p>{count}</p>
        </div>
      <div>
        <p className='text-dark-700'>{label}</p>
      </div>
    </div>
  )
}

export default StatCard
