import { AuthGuard } from "@/components/layout/auth-guard";
import { NavigationApp } from "@/components/layout/navigation-app";

const Layout = ({
  children,
  noPadding,
  fullScreen,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
  fullScreen?: boolean;
}) => {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        {!fullScreen && <NavigationApp />}
        <main className={`${noPadding ? "" : "px-12 py-5"} relative w-full`}>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
};

export { Layout };
