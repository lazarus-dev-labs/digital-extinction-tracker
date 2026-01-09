import React from "react";
import { Shield, Lock, Eye, Globe } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f6f1eb] py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-[#D4A373]/20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5D1010] font-serif mb-4">Privacy Policy</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Last Updated: January 2026</p>
          <div className="w-20 h-1 bg-[#8b3f1f] mx-auto mt-6"></div>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-[#8b3f1f] flex items-center gap-2 mb-4">
              <Shield size={20} /> 1. Commitment to Preservation
            </h2>
            <p>
              Rune (Digital Extinction Tracker) is committed to protecting the privacy of our contributors and the integrity of the cultural data we host. This policy outlines how we handle personal information and sensitive cultural heritage data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#8b3f1f] flex items-center gap-2 mb-4">
              <Eye size={20} /> 2. Data We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contributor Information:</strong> Name and contact details for account verification.</li>
              <li><strong>Source Metadata:</strong> Age, village, and origin of cultural stories to ensure historical accuracy.</li>
              <li><strong>Media Assets:</strong> Audio recordings and images uploaded for preservation purposes.</li>
            </ul>
          </section>

          <section className="bg-[#fcfaf7] p-6 rounded-lg border-l-4 border-[#8b3f1f]">
            <h2 className="text-xl font-bold text-[#8b3f1f] mb-2">3. Cultural Sensitivity</h2>
            <p className="text-sm">
              We recognize that some knowledge is sacred. Rune provides options to mark data as "Restricted" or "Public" to ensure that sensitive traditions are not exploited or misused.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#8b3f1f] flex items-center gap-2 mb-4">
              <Lock size={20} /> 4. Data Security
            </h2>
            <p>
              We utilize AI-driven encryption and Firebase-protected databases to ensure that your contributions are safe from digital loss and unauthorized access.
            </p>
          </section>

          <div className="pt-10 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-4">Have questions about your data?</p>
            {/* <button className="bg-[#8b3f1f] text-white px-6 py-2 rounded-lg hover:bg-[#70301a] transition-all">
              Contact Privacy Team
            </button> */}
            <button 
              onClick={() => navigate("/contact")}
              className="bg-[#8b3f1f] text-white px-6 py-2 rounded-lg hover:bg-[#70301a] transition-all"
            >
              Contact Privacy Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;