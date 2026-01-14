import React from "react";
import { BookOpen, Scale, AlertCircle, CheckCircle } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#f6f1eb] py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-[#D4A373]/20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5D1010] font-serif mb-4">Terms of Service</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Effective Date: January 1, 2026</p>
          <div className="w-20 h-1 bg-[#8b3f1f] mx-auto mt-6"></div>
        </div>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-[#8b3f1f] flex items-center gap-2 mb-4">
              <Scale size={20} /> 1. Acceptance of Terms
            </h2>
            <p>
              By accessing Rune, you agree to abide by these terms. Our mission is the ethical preservation of knowledge. Any use of this platform for commercial exploitation of indigenous or local knowledge is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#8b3f1f] flex items-center gap-2 mb-4">
              <BookOpen size={20} /> 2. Intellectual Property
            </h2>
            <p>
              Ownership of the cultural content remains with the original source (the elder or the community). By uploading to Rune, you grant the project a license to <strong>archive and preserve</strong> the data for educational and research purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#8b3f1f] flex items-center gap-2 mb-4">
              <AlertCircle size={20} /> 3. Accurate Contribution
            </h2>
            <p>
              Contributors must ensure that the information provided is as accurate as possible. Intentional fabrication of historical "facts" or rituals may lead to account suspension to maintain the integrity of the Digital Vault.
            </p>
          </section>

          <section className="bg-[#fcfaf7] p-6 rounded-lg border-l-4 border-[#5D1010]">
            <h2 className="text-xl font-bold text-[#5D1010] mb-2 font-serif">Research Usage</h2>
            <p className="text-sm">
              Data on this platform is provided for non-profit research. If you wish to use Rune data for a publication, you must cite the <strong>Digital Extinction Tracker</strong> and the specific source community.
            </p>
          </section>

          <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">© 2026 Team Lazarus (University Project)</p>
            <div className="flex gap-4">
               <button className="text-[#8b3f1f] font-bold text-sm hover:underline">Download PDF</button>
               <button className="text-[#8b3f1f] font-bold text-sm hover:underline">Accept Terms</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;