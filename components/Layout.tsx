import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full min-h-screen bg-gray-200 flex flex-col items-center justify-between">
      <Navbar />
      <main className="w-full h-full flex justify-center max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
