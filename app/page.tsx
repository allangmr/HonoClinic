import PatientForm from "@/components/forms/PatientForm";
import PassKeyModal from "@/components/PassKeyModal";
import Image from "next/image";
import Link from "next/link";
const Home = async ({searchParams}: SearchParamProps) => {
  const {admin} = await searchParams
  const isAdmin = admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | Pass Key Modal */}
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/assets/icons/logo-full.svg" alt="HonoClinic Logo" width={1000} height={1000} className="mb-12 h-10 w-fit" />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 HonoClinic
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <Image src="/assets/images/onboarding-img.png" height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
    </div>
  );
}

export default Home;
