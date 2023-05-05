import { AuthGuard } from "@/components/layout/auth-guard";
import { NavigationApp } from "@/components/layout/navigation-app";

const Layout = ({
  children,
  fullWidth,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <AuthGuard>
      <div className="relative min-h-screen">
        <NavigationApp />
        <main className={`${fullWidth ? "" : "container"}`}>{children}</main>
      </div>
    </AuthGuard>
  );
};

export { Layout };
