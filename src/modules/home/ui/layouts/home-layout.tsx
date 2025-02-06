import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "../components/home-navbar";


interface HomeLayout {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayout) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div>{children}
          
        </div>
      </div>
    </SidebarProvider>
  );
};
