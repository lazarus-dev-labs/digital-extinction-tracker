import React from "react";
import logoImg from "../assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth()!; // get auth state and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // log the user out
    navigate("/"); // redirect to home
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Actual Logo Image */}
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          <img 
            src={logoImg}
            alt="Rune Logo" 
            className="h-20 w-auto object-contain"
          />
          {/* <span className="font-['Playfair_Display'] font-bold text-2xl text-[#5D1010] hidden sm:block">
            Rune
          </span> */}
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">About Us</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
                <NavigationMenuLink href="/category/Tradition & Rituals">Tradition & Rituals</NavigationMenuLink>
                <NavigationMenuLink href="/category/Arts & Performance">Arts & Performance</NavigationMenuLink>
                <NavigationMenuLink href="/category/Knowledge & Practices">Knowledge & Practices</NavigationMenuLink>
                <NavigationMenuLink href="/category/Crafts & Industries">Crafts & Industries</NavigationMenuLink>
                <NavigationMenuLink href="/category/Festivals & Social Events">Festivals & Social Events</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/preserve">Preserve</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons & Profile */}
        <div className="flex items-center gap-4">
          {!!user ? (
            <div className="flex items-center gap-3">
              {/* USER AVATAR BUTTON */}
              <button
                onClick={() => navigate("/dashboard")} // Navigates to user dashboard
                className="group relative flex items-center justify-center"
              >
                <div 
                  className="w-10 h-10 rounded-full bg-[#8b3f1f] flex items-center justify-center 
                  text-white font-bold border-2 border-white shadow-md overflow-hidden 
                  transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                  title="Go to Dashboard"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                
                {/* Simple tooltip that shows on hover */}
                {/* <span className="absolute -bottom-8 scale-0 transition-all rounded bg-gray-800 p-1 text-xs text-white group-hover:scale-100">
                  Dashboard
                </span> */}
              </button>

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="border border-[#8b3f1f] px-4 py-1 rounded text-sm font-medium 
                text-[#3e2723] hover:bg-[#8b3f1f] hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/login")}
                className="text-[#3e2723] px-4 py-1 font-medium hover:underline transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-[#8b3f1f] text-white px-5 py-2 rounded-full text-sm font-medium 
                hover:bg-[#6f3218] transition shadow-md"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;