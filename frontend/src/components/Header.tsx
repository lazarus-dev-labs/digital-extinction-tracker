import { useState } from "react"; // Menu eka open/close karanna
import { Menu, X } from "lucide-react"; // Icons dekak danna
import logoImg from "../assets/logo.png";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem
} from "./ui/navigation-menu";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth()!;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo Section */}
        <div 
          className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate("/")}
        >
          <img src={logoImg} alt="Rune Logo" className="h-16 md:h-20 w-auto object-contain" />
        </div>

        {/* Desktop Navigation - Hidden on Mobile (hidden md:flex) */}
        <div className="hidden md:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6">
              <NavigationMenuItem><Link to="/" className="navigation-link">Home</Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/about" className="navigation-link">About Us</Link></NavigationMenuItem>
              <NavigationMenuItem><Link to="/category" className="navigation-link">Categories</Link></NavigationMenuItem>
              {!!user && (
                <NavigationMenuItem><Link to="/preserve" className="navigation-link">Preserve</Link></NavigationMenuItem>
              )}
              <NavigationMenuItem><Link to="/contact" className="navigation-link">Contact</Link></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Auth Buttons & Hamburger Icon */}
        <div className="flex items-center gap-4">
          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {!!user ? (
              <div className="flex items-center gap-3">
                <button onClick={() => navigate("/dashboard")} className="w-10 h-10 rounded-full bg-[#8b3f1f] flex items-center justify-center text-white font-bold border-2 border-white shadow-md overflow-hidden">
                  {user.photoURL ? <img src={user.photoURL} alt="User" className="w-full h-full object-cover" /> : <span className="text-sm">{user.email?.charAt(0).toUpperCase()}</span>}
                </button>
                <button onClick={handleLogout} className="border border-[#8b3f1f] px-4 py-1 rounded text-sm font-medium text-[#3e2723] hover:bg-[#8b3f1f] hover:text-white transition">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate("/login")} className="text-[#3e2723] px-4 py-1 font-medium hover:underline">Login</button>
                <button onClick={() => navigate("/register")} className="bg-[#8b3f1f] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#6f3218] transition shadow-md">Signup</button>
              </div>
            )}
          </div>

          {/* Hamburger Icon - Only Visible on Mobile (md:hidden) */}
          <button 
            className="md:hidden p-2 text-gray-600" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t absolute w-full left-0 shadow-lg animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg font-medium">Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg font-medium">About Us</Link>
            <Link to="/category" onClick={() => setIsOpen(false)} className="text-lg font-medium">Categories</Link>
            {!!user && <Link to="/preserve" onClick={() => setIsOpen(false)} className="text-lg font-medium">Preserve</Link>}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg font-medium">Contact</Link>
            
            <hr className="my-2" />
            
            {/* Mobile Auth Buttons */}
            {!!user ? (
              <div className="flex flex-col gap-3">
                <button onClick={() => { navigate("/dashboard"); setIsOpen(false); }} className="text-left font-medium text-[#8b3f1f]">My Dashboard</button>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 py-2 rounded font-medium text-center">Logout</button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button onClick={() => { navigate("/login"); setIsOpen(false); }} className="border border-[#8b3f1f] py-2 rounded text-[#8b3f1f] font-medium">Login</button>
                <button onClick={() => { navigate("/register"); setIsOpen(false); }} className="bg-[#8b3f1f] text-white py-2 rounded font-medium">Signup</button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;