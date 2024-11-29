import PatientForm from "@/components/forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}:SearchParamProps) {
    const isAdmin = searchParams.admin === "true"
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP  verification | PASSKEY VERIFICATION*/}
      {isAdmin && <PasskeyModal/>}
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
