import Link from "next/link";
import Image from "next/image";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/router";

const NavigationApp = () => {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700">
      <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex gap-8">
          <Link href="/dashboard" className="flex cursor-pointer items-center">
            <div className="flex cursor-pointer items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={22} height={22} />
              <div className="font-bold">luno</div>
            </div>
          </Link>
          <NavigationMenu />
        </div>
        <div className="flex gap-2">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

const NavigationMenu = () => {
  const router = useRouter();
  const menuItems = [
    { label: "Overview", path: "/dashboard" },
    { label: "Example Post", path: "/example-posts" },
  ];

  const isActive = (path: string) => {
    if (router.pathname === path) return true;
    return router.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`${
            isActive(item.path) ? "text-foreground" : "text-foreground/60"
          } transition-colors hover:text-foreground/80`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export { NavigationApp };
