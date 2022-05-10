import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavbarMobile from "./NavbarMobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen bg-gray-200 flex flex-col items-center justify-between">
      <Navbar />
      <NavbarMobile />
      <main className="w-full h-full flex flex-grow justify-center p-5 max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
