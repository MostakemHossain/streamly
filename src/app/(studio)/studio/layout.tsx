import { StudioLayout } from "@/modules/studio/ui/layouts/studio-layout";

interface Layout {
  children: React.ReactNode;
}

const Layout = ({ children }: Layout) => {
  return <StudioLayout>{children}</StudioLayout>;
};

export default Layout;
