import React from "react";
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
        {/* Logo */}
        <div
          className="font-bold text-xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Rune
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
                <NavigationMenuLink href="#">Story</NavigationMenuLink>
                <NavigationMenuLink href="#">Tradition</NavigationMenuLink>
                <NavigationMenuLink href="#">Language</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Preserve</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex gap-2">
          {!!user ? (
            <button
              onClick={handleLogout}
              className="border border-[#8b3f1f] px-4 py-1 rounded hover:bg-[#8b3f1f] hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="border border-[#8b3f1f] px-4 py-1 rounded hover:bg-[#8b3f1f] hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="border border-[#8b3f1f] px-4 py-1 rounded hover:bg-[#8b3f1f] hover:text-white transition"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
