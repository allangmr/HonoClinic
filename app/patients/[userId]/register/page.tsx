import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const Register = async ({params: {userId}}: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src="/assets/icons/logo-full.svg" alt="HonoClinic Logo" width={1000} height={1000} className="mb-12 h-10 w-fit" />
          <RegisterForm user={user} />
          <p className="copy-right py-12">
            © 2025 HonoClinic
          </p>
        </div>
      </section>
      <Image src="/assets/images/register-img.png" height={1000} width={1000} alt="patient" className="side-img max-w-[35%]" />
    </div>
  )
}

export default Register