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
import { User } from "lucide-react"; // Import User icon

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth(); // Assuming 'user' is available in context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="font-bold text-xl cursor-pointer text-[#9F3B0F]" onClick={() => navigate("/")}>
          Rune
        </div>

        {/* Navigation Menu (Hidden on small screens) */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="hover:text-[#9F3B0F] transition">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about" className="hover:text-[#9F3B0F] transition">About Us</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:text-[#9F3B0F]">Categories</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2 min-w-[150px]">
                <NavigationMenuLink href="#" className="hover:bg-[#F4F1EA] p-2 rounded">Story</NavigationMenuLink>
                <NavigationMenuLink href="#" className="hover:bg-[#F4F1EA] p-2 rounded">Tradition</NavigationMenuLink>
                <NavigationMenuLink href="#" className="hover:bg-[#F4F1EA] p-2 rounded">Language</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="hover:text-[#9F3B0F] transition">Preserve</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#" className="hover:text-[#9F3B0F] transition">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth / Profile Section */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="border border-[#9F3B0F] text-[#9F3B0F] px-4 py-1 rounded hover:bg-[#9F3B0F] hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="bg-[#9F3B0F] text-white px-4 py-1 rounded hover:bg-[#EF9829] transition"
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Avatar Circle */}
              <div 
                className="w-10 h-10 rounded-full bg-[#F0C17F] border-2 border-[#9F3B0F] flex items-center justify-center cursor-pointer overflow-hidden hover:opacity-80 transition"
                onClick={() => navigate("/profile")}
              >
                {/* Show user image if available, else show icon */}
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={20} className="text-[#9F3B0F]" />
                )}
              </div>
              
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-600 hover:text-[#9F3B0F] transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;