"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   router.replace("/dashboard");
  // }, [router]);
  return (
    <main>

      <div className="w-screen min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Corner Top Left */}
        <Image
          src="/corner-top.png"
          alt="Corner Top Left"
          className="absolute top-0 left-0 size-48 md:size-72"
          width={400}
          height={400}
        />

        {/* Corner Top Right */}
        <Image
          src="/landing-trash-bag.png"
          alt="Corner Top Right"
          className="absolute top-0 right-0 size-40 md:size-52 mt-10"
          width={400}
          height={400}
        />

        {/* star */}
        <Image
          src="/star.png"
          alt="star1"
          className="absolute top-40 left-[20%] md:top-56 lg:top-10 md:left-[30%] size-32"
          width={100}
          height={100}
        />

        <div className="relative text-center w-full animate-fade-in cursor-pointer translate-x-20 -translate-y-5" onClick={() => router.replace("/scan")}>
          {/* Logo Center*/}
          <Image
            src="/logo.png"
            alt="WasteScan Logo"
            className="mx-auto mb-4 md:w-[700px] md:h-[275px]"
            width={2000}
            height={1000}
          />
          <div className="relative w-full flex justify-center">
            <p
              className=" mb-6 bg-[#437754] text-[#D3BE43] w-fit pb-2 pt-4 font-semibold text-4xl tracking-wider px-6"
              style={{ fontFamily: "'Grandstander', 'Be Vietnam Pro', sans-serif" }}
            >
              Hãy cùng phân loại rác nàooooo!
            </p>
          </div>
        </div>

        {/* star */}
        <Image
          src="/star.png"
          alt="star3"
          className="absolute bottom-[57%] right-0 md:bottom-[60%] lg:bottom-[50%] md:right-[3%] size-32"
          width={100}
          height={100}
        />

        {/* star */}
        <Image
          src="/star.png"
          alt="star3"
          className="absolute bottom-[20%] right-[10%] md:bottom-[15%] lg:bottom-10 md:right-[30%] size-32"
          width={100}
          height={100}
        />

        {/* Corner Bottom Left */}
        <Image
          src="/mascot.png"
          alt="Corner Bottom Left"
          className="absolute bottom-0 left-0 w-56 h-60 md:w-[25.5rem] md:h-[30rem] -translate-x-10 translate-y-7 md::translate-x-2 md::-translate-y-3"
          width={800}
          height={1000}
        />

        {/* Corner Bottom Right */}
        <Image
          src="/corner-bottom.png"
          alt="Corner Bottom Right"
          className="absolute bottom-0 right-0 w-40 h-48 md:size-72"
          width={400}
          height={400}
        />
      </div>
    </main>
  );
}
