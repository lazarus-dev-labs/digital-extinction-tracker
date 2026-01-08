import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import ScrollToTop from "../components/ScrollToTop";
import { Outlet, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/AuthContext";
// import ChatBot from "../components/ChatBot";
import Preloader from "../components/Preloader";

function RootLayout() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    // Simulate loading for 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

  
  const hideHeaderFooterPaths = [
    "/login",
    "/signup",
    "/user",
    // "/transaction",
    "/notfoundpage",
    // "/employee-profile",
    // "/dashboard",
    "/*"
  ];

  const shouldHide = hideHeaderFooterPaths.some((path) =>
    location.pathname.toLowerCase().startsWith(path.toLowerCase())
  );

  // Show preloader first
  if (loading) return <Preloader />;

  return (
    <>
    <Header />
    <Outlet />
    <Footer />
      {/* <ScrollToTop />
      <div className="text-white min-h-screen flex flex-col">
        {!shouldHide && <Header />}
        <main className="flex-grow min-h-screen bg-gradient-to-b from-[#0f172a] via-[#141c2e] to-[#121c32]">
          <Outlet />
          <ChatBot />
        </main>
        {!shouldHide && <Footer />}
      </div> */}
    </>
  );
}

export default RootLayout;