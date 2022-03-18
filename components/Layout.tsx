import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen flex flex-col items-center">
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
