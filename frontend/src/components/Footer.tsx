import React from "react";
import { 
  FaFacebookF, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram, 
  FaWhatsapp,
  FaXTwitter,
  FaEnvelope 
} from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-[#FDFCFB] border-t border-[#8b3f1f]/20 pt-8 pb-6 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-10">
          
          {/* Column 1: Brand & Team */}
          <div className="flex flex-col items-start space-y-4">
            <div 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => navigate("/")}
            >
              <img 
                src={logoImg}
                alt="Rune Logo" 
                className="h-20 w-auto object-contain" 
              />
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Preserving the digital echoes of what the world is losing. 
              Built with purpose by <span className="font-semibold text-[#8b3f1f]">Team Lazarus</span>.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:pl-8">
            <h3 className="font-bold text-[#8b3f1f] uppercase tracking-wider text-xs mb-6">Navigation</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-[#8b3f1f] hover:translate-x-1 inline-block transition-all">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#8b3f1f] hover:translate-x-1 inline-block transition-all">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#8b3f1f] hover:translate-x-1 inline-block transition-all">Contact</Link></li>
              <li><Link to="/preserve" className="hover:text-[#8b3f1f] hover:translate-x-1 inline-block transition-all">Preservation Hub</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold text-[#8b3f1f] uppercase tracking-wider text-xs mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-[#8b3f1f] mt-1 flex-shrink-0" />
                <a href="mailto:rune@outlook.com" className="hover:text-[#8b3f1f] break-all transition">rune@outlook.com</a>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-[#8b3f1f] mt-1 flex-shrink-0" />
                <a href="https://wa.me/1234567890" className="hover:text-[#8b3f1f] transition">+123 456 7890</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-[#8b3f1f] uppercase tracking-wider text-xs mb-6">Stay Updated</h3>
            <form className="flex group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-l-lg focus:outline-none focus:border-[#8b3f1f] transition-colors"
              />
              <button className="bg-[#8b3f1f] text-white px-5 py-2.5 rounded-r-lg hover:bg-[#70301a] transition-colors flex items-center justify-center">
                <FaEnvelope size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar: This is where we center the icons */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Left: Copyright */}
          <div className="text-xs text-gray-400 order-3 md:order-1 text-center md:text-left flex-1">
            © {new Date().getFullYear()} <span className="font-semibold">Rune</span>. Team Lazarus.
          </div>

          {/* Middle: Centered Social Icons */}
          <div className="flex items-center justify-center gap-6 order-1 md:order-2 flex-1">
            <a href="https://www.facebook.com/profile.php?id=61586014870730" className="text-gray-400 hover:text-[#8b3f1f] transition-all transform hover:scale-110"><FaFacebookF size={30}/></a>
            <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition-all transform hover:scale-110"><FaLinkedinIn size={30}/></a>
            <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition-all transform hover:scale-110"><FaGithub size={30}/></a>
            <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition-all transform hover:scale-110"><FaXTwitter size={30}/></a>
            <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition-all transform hover:scale-110"><FaInstagram size={30}/></a>
          </div>

          {/* Right: Legal Links */}
          <div className="flex justify-center md:justify-end gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-400 order-2 md:order-3 flex-1">
            <a href="/privacy" className="hover:text-[#8b3f1f] transition">Privacy</a>
            <a href="/terms" className="hover:text-[#8b3f1f] transition">Terms</a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;