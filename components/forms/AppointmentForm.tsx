"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { Doctors, FormFieldType } from "@/costants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.action";


const AppointmentForm = ({
    userId,patientId,type
  }:{
    userId:string,
    patientId:string,
    type:"create" | "cancel" | "schedule"
  }
) => {
  const router = useRouter();
  const [isLoading,setIsLoading] = useState<boolean>(false)

  const AppointmentFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointmentFormValidation >>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician:"",
      schedule:new Date(),
      notes:"",
      reason:"",
      cancellationReason:""
       },
  });
  


  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {    
    setIsLoading(true);
    let status ;

    switch(type){
      case "schedule":
        status = "scheduled"; 
        break;
      case "cancel":
          status = "cancelled"; break;
      default:
            status = "pending"; break;
    }
    try{
       if(type === "create" && patientId){
      const appointmentData ={
        userId,
        patient:patientId,
        primaryPhysician:values.primaryPhysician,
        schedule:new Date(values.schedule),
        reason: values.reason || "",
        notes:values.notes,
        status:status as Status
      } 
      const newAppointment = await  createAppointment(appointmentData);

      if(newAppointment)
      {
        form.reset();
        router.push(`/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`)
      };

       }
    }catch(err){
      console.log(err);
    }
    finally{
      setIsLoading(false);
    }
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment in 10 sec</p>
        </div>

        {
          type !== "cancel" && (
            <>
            <CustomFormField
               formFieldType={FormFieldType.SELECT}
               control={form.control}
               name="primaryPhysician"
               label="Doctor"
                placeholder="Select a Doctor"
          >
            {Doctors.map((doctor, i) => (
              <SelectItem key={doctor.name + i} value={doctor.name}>
                <div className="flex cursor-pointer items-center gap-2">
                  <Image
                    src={doctor.image}
                    width={32}
                    height={32}
                    alt="doctor"
                    className="rounded-full border border-dark-500"
                  />
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>

          <CustomFormField 
             formFieldType={FormFieldType.DATE_PICKER}
             control={form.control}
             name="Schedule"
             label="Expected appointment date"
             showTimeSelect
             dateFormat="MM/dd/yyyy -h:mm aa"
          />
          <div className="flex flex-col xl:flex-row gap-6">
           <div className="w-full">
           <CustomFormField
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="reason"
              label="Reason for appointment"
              placeholder="Enter reason for appointment"
            />
           </div>
           <div className="w-full">
            <CustomFormField
               formFieldType={FormFieldType.TEXTAREA}
               control={form.control}
               name="notes"
               label="Notes"
               placeholder="Enter notes"
              />   
              </div>
          </div>
         </>
        )}
          {
            type =='cancel' &&(
              <CustomFormField 
              formFieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for cancellation"
              placeholder="Enter reason for cancellation"
           />
            )
          }

              <SubmitButton isLoading={isLoading} className={`${type ==='cancel'?"shad-danger-btn":"shad-primary-btn"} w-full`} >{`${type.charAt(0).toUpperCase() + type.slice(1)} Appointment`}</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
