import { AuthGuard } from "@/components/layout/auth-guard";
import { NavigationApp } from "@/components/layout/navigation-app";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuard>
      <NavigationApp />
      <main>{children}</main>
    </AuthGuard>
  );
};

export { Layout };
