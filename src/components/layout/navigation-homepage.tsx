import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const NavigationHomepage = () => {
  return (
    <nav className="transparent sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700">
      <div className="container m-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex">
          <Link href="/" className="flex cursor-pointer items-center">
            <div className="flex cursor-pointer items-center gap-2">
              <Image src="/logo.svg" alt="logo" width={22} height={22} />
              <div className="font-bold">luno</div>
            </div>
          </Link>
        </div>
        <NavigationRight />
      </div>
    </nav>
  );
};

const NavigationRight = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return (
      <Link href="/dashboard">
        <Button>
          Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex gap-2">
      <Link href="/sign-in">
        <Button variant="ghost">Login</Button>
      </Link>
      <Link href="/sign-up">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
};

export { NavigationHomepage };