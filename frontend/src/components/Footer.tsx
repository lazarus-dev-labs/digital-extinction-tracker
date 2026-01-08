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
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#8b3f1f]/20 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          
          {/* Column 1: Brand & Team */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#8b3f1f]">Rune</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Preserving the digital echoes of what the world is losing. 
              Powered by <span className="font-semibold text-[#8b3f1f]">Team Lazarus</span>.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition"><FaFacebookF size={18}/></a>
              <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition"><FaLinkedinIn size={18}/></a>
              <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition"><FaGithub size={18}/></a>
              <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition"><FaXTwitter size={18}/></a>
              <a href="#" className="text-gray-400 hover:text-[#8b3f1f] transition"><FaInstagram size={18}/></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-[#8b3f1f] mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-[#8b3f1f] transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#8b3f1f] transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#8b3f1f] transition">Contact</Link></li>
              <li><Link to="/preserve" className="hover:text-[#8b3f1f] transition">Preservation Hub</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-bold text-[#8b3f1f] mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2 text-wrap overflow-hidden">
                <FaEnvelope className="text-[#8b3f1f] flex-shrink-0" />
                <a href="mailto:rune@outlook.com" className="hover:underline">rune@outlook.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-[#8b3f1f] flex-shrink-0" />
                <a href="#" className="hover:underline">+123 456 7890</a>
              </li>
              <li className="italic opacity-80 pt-2">Developed by Team Lazarus</li>
            </ul>
          </div>

          {/* Column 4: Newsletter/Updates */}
          <div>
            <h3 className="font-bold text-[#8b3f1f] mb-4">Stay Updated</h3>
            <p className="text-xs text-gray-500 mb-3">Join our newsletter to track digital extinction trends.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full px-3 py-2 text-sm border border-[#8b3f1f]/30 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-[#8b3f1f]"
              />
              <button className="bg-[#8b3f1f] text-white px-3 py-2 rounded-r-lg hover:bg-[#70301a] transition">
                <FaEnvelope />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div>© 2026 Rune: Digital Extinction Tracker. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#8b3f1f] transition">Privacy Policy</a>
            <a href="#" className="hover:text-[#8b3f1f] transition">Terms of Service</a>
            <a href="#" className="hover:text-[#8b3f1f] transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;