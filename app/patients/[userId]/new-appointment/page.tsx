import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
 
export default async function NewAppointment({params:{userId}}:SearchParamProps) {


  const patient = await getPatient(userId)
   



  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patients"
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm 
           type="create"
           userId={userId}
           patientId={patient.$id}
          />

            <p className="justify-end text-dark-600 xl:text-left mt-6">
              ©2024 CarePulse
            </p>
        </div>
      </section>
      <Image  
       width={1000}
       height={1000}
      src={"/images/appointment-img.png"} 
      alt="patient"
      className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
