import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'

const Register = async ({ params: { userId } }: SearchParamProps) => {

  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patients"
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user!} />
          <p className="copyright py-12 ">
            ©2024 CarePulse
          </p>
        </div>
      </section>
      <Image
        width={1000}
        height={1000}
        src={"/images/register-img.png"}
        alt="patient"
        className="side-img max-w-[395px]"
      />
    </div>
  )
}

export default Register
