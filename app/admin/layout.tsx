import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Navbar menuLinks={[{ link: "/api/auth/signout?callbackUrl=/", label: "Logout" }]}>{children}</Navbar>;
}
