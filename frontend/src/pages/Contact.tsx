import { useState } from "react";
import { 
  FaEnvelope, 
  FaUsers, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaGithub, 
  FaInstagram, 
  FaWhatsapp,
  FaXTwitter 
} from "react-icons/fa6"; // Using Fa6 for the X (Twitter) icon

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f1eb] p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg border border-[#8b3f1f] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Info Panel (Dark Brand Color) */}
        <div className="bg-[#8b3f1f] text-white p-8 md:w-2/5 flex flex-col">
          <h2 className="text-3xl font-bold mb-2">Rune</h2>
          <p className="text-[#f6f1eb] mb-8 opacity-90 italic">
            Digital Extinction Tracker
          </p>

          <div className="space-y-6 flex-grow">
            <div className="flex items-center gap-4">
              <div className="bg-[#f6f1eb]/20 p-3 rounded-lg">
                <FaUsers className="text-xl text-[#f6f1eb]" />
              </div>
              <div>
                <p className="font-semibold">Our Team</p>
                <p className="text-sm opacity-80 text-[#f6f1eb]">Team Lazarus</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#f6f1eb]/20 p-3 rounded-lg">
                <FaEnvelope className="text-xl text-[#f6f1eb]" />
              </div>
              <div>
                <p className="font-semibold">Email Us</p>
                <p className="text-sm opacity-80 text-[#f6f1eb]">rune@outlook.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[#f6f1eb]/20 p-3 rounded-lg">
                <FaWhatsapp className="text-xl text-[#f6f1eb]" />
              </div>
              <div>
                <p className="font-semibold">WhatsApp</p>
                <p className="text-sm opacity-80 text-[#f6f1eb]">+123 456 7890</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-12">
            <p className="text-sm font-semibold mb-4 uppercase tracking-wider opacity-70">Follow Our Journey</p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="p-3 bg-[#f6f1eb]/10 hover:bg-[#f6f1eb] hover:text-[#8b3f1f] transition-all rounded-full border border-[#f6f1eb]/30">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="p-3 bg-[#f6f1eb]/10 hover:bg-[#f6f1eb] hover:text-[#8b3f1f] transition-all rounded-full border border-[#f6f1eb]/30">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="p-3 bg-[#f6f1eb]/10 hover:bg-[#f6f1eb] hover:text-[#8b3f1f] transition-all rounded-full border border-[#f6f1eb]/30">
                <FaGithub size={18} />
              </a>
              <a href="#" className="p-3 bg-[#f6f1eb]/10 hover:bg-[#f6f1eb] hover:text-[#8b3f1f] transition-all rounded-full border border-[#f6f1eb]/30">
                <FaXTwitter size={18} />
              </a>
              <a href="#" className="p-3 bg-[#f6f1eb]/10 hover:bg-[#f6f1eb] hover:text-[#8b3f1f] transition-all rounded-full border border-[#f6f1eb]/30">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form (White Background) */}
        <div className="p-10 md:w-3/5">
          <h2 className="text-2xl font-bold text-[#8b3f1f] mb-2">Send us a Message</h2>
          <p className="text-gray-500 mb-8">Have questions about tracked data? Reach out to Team Lazarus.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1 text-[#8b3f1f]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#8b3f1f]/30 focus:border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]/20 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-[#8b3f1f]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#8b3f1f]/30 focus:border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]/20 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#8b3f1f]">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 rounded-lg border border-[#8b3f1f]/30 focus:border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]/20 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-[#8b3f1f]">Message</label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full px-4 py-2.5 rounded-lg border border-[#8b3f1f]/30 focus:border-[#8b3f1f] focus:outline-none focus:ring-2 focus:ring-[#8b3f1f]/20 transition-all resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#8b3f1f] text-white py-3 rounded-lg font-bold hover:bg-[#70301a] transition-all shadow-md active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;