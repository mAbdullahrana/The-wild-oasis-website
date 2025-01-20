import Image from "next/image";
import Link from "next/link";
import { getCabins } from "../_lib/data-service";

async function Logo() {
  const cabin = await getCabins()
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image quality={100} src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
       
      </span>
    </Link>
  );
}

export default Logo;
