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
      <NavigationApp />
      <main className={`${fullWidth ? "" : "container"}`}>{children}</main>
    </AuthGuard>
  );
};

export { Layout };
