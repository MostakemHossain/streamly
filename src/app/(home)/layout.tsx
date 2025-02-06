import { HomeLayout } from "@/modules/home/ui/layouts/home-layout";

interface Layout {
  children: React.ReactNode;
}

const Layout = ({ children }: Layout) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
