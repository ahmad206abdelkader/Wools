import React from "react";

import LeftSidebar from "@/components/layout/LeftSidebar";
import MobileBottomNavigation from "@/components/layout/MobileBottomNavigation";
import RightSidebar from "@/components/layout/RightSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-transparent">
      <div className="mx-auto grid min-h-screen w-full max-w-[1280px] grid-cols-1 md:grid-cols-[88px_minmax(0,640px)] md:justify-center md:gap-3 xl:grid-cols-[260px_minmax(0,640px)_320px] xl:gap-5">
        <LeftSidebar />

        <main
          id="main-content"
          className="min-h-screen min-w-0 border-[#242a31] bg-[#0b0e12]/95 pb-20 md:border-x md:pb-0"
        >
          {children}
        </main>

        <RightSidebar />
      </div>

      <MobileBottomNavigation />
    </div>
  );
};

export default AppLayout;
