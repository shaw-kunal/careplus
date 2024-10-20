import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import Link from "next/link";
 const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

export default function Home() {
console.log(PROJECT_ID);
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP  verification | PASSKEY VERIFICATION*/}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patients"
            className="mb-12 h-10 w-fit"
          />
          <PatientForm />

          <div className="text-14- mt-20 flex justify-center gap-10">
            <p className="justify-end text-dark-600 xl:text-left">
              ©2024 CarePulse
            </p>
            <Link href={"/?admin=true"} className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image  
       width={1000}
       height={1000}
      src={"/images/onboarding-img.png"} 
      alt="patient"
      className="side-img max-w-[50%]"
      />
    </div>
  );
}
