import StatCard from '@/components/StatCard'
import { columns, Payment } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'
import { getRecentAppointmentList } from '@/lib/actions/appointment.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = async() => {


  const appointments = await getRecentAppointmentList();

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href={"/"} className='cursor-pointer'>
        <Image 
          src="/icons/logo-full.svg"
          alt='Logo'
          height={32}
          width={162}
        />
        </Link>
        <p className='text-16-semibol'>Admin Dashboard</p>
      </header>
      <main className='admin-main'>
        <section className='w-full space-y-4'>
             <h1 className='header'>Welcome ✅</h1> 
             <p className='text-dark-700'>Start the day with managing with new appointment</p> 
        </section>

        <section className='admin-stat'>
            <StatCard
             type="appointments"
             count={appointments?.scheduledCount}
             label="Scheduled appointments"
             icon="/icons/appointments.svg"
            />
            <StatCard
             type="pending"
             count={appointments?.pendingCount}
             label="Scheduled Pending"
             icon="/icons/pending.svg"
            />
            <StatCard
             type="cancelled"
             count={appointments?.cancelledCount}
             label="Scheduled cancelled"
             icon="/icons/cancelled.svg"
            />
        </section>
        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  )
}

export default Admin
