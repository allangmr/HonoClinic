import Image from "next/image";
export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image src="/images/logo.svg" alt="logo" width={200} height={200} />
        </div>
      </section>
    </div>
  );
}
