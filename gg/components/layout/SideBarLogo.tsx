import { useRouter } from "next/router"
import Image from "next/image";

const SideBarLogo = () => {
    const router = useRouter();

  return (
    <div
    onClick={() => router.push('/')}
    className=" rounded-full h-14 w-14 p-3 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition"
    >
        <Image src="/wools.png" width={50} height={50} alt="wools"/>
    </div>
  )
}

export default SideBarLogo;