import Link from "next/link";
import Image from "next/image";

import { UserButton } from "@clerk/nextjs";

const NavigationApp = () => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700">
      <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex">
          <Link href="/dashboard" className="flex cursor-pointer items-center">
            <div className="flex cursor-pointer items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={22} height={22} />
              <div className="font-bold">luno</div>
            </div>
          </Link>
        </div>
        <div className="flex gap-2">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export { NavigationApp };
