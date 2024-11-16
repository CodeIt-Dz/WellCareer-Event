import DecoratedButton from "@/components/decorated-button"
import Image from "next/image"
import Link from "next/link"

export default function ConnectHome() {
  return (
    <section className="rayan-section w-[100%] py-24">
      <div className="flex items-center justify-center gap-32">
            <div className="flex flex-col items-start justify-center gap-8">
                  <h1 className="text-[#423BCA] font-bold text-3xl " >
                  Lorem ipsum odor amet elit.
                  </h1>
                  <p className="line-clamp-3 font-semibold text-2xl ">
                        Mattis porta mauris pharetra sit sagittis iaculis <br />
                        tempor class. Habitant pulvinar sapien <br />
                        morbi nunc proin feugiat.
                  </p>


                  <DecoratedButton/>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
            <Image
              src="/logo_check.svg"
              alt="Logo"
              width={400}
              height={400}
              className="h-auto w-full max-w-[400px]"
              priority
            />
          </div>
            

      </div>
    </section>
  )
}