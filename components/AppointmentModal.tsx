'use client';
import { Appointment } from '@/types/appwrite.types';
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
import AppointmentForm from './forms/AppointmentForm';
import { toCapitalizeString } from '@/lib/utils';
const AppointmentModal = ({
    patientId,
    userId,
    appointment,
    type,
    title,
    description
}:{
    patientId:string;
    userId:string;
    appointment?:Appointment,
    type:"schedule"|"cancel" ,
    title:string,
    description:string
}) => {

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" 
          className={`capitalize ${type === 'schedule' && "text-green-500"} ${type === 'cancel' && "text-red-500"}`}
        >{type}</Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader>
          <DialogTitle> {toCapitalizeString(`${type} Appointment`)}</DialogTitle>
          <DialogDescription>
                    Please fill in the following details to {type} appoinment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm 
           patientId={patientId}
           userId={userId}
           type={type}
           appoinment={appointment}
           setOpen={setOpen}
         /> 
       </DialogContent>
    </Dialog>
  )
}

export default AppointmentModal
