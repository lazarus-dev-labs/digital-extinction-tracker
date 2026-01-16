import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Hammer, Clock, ShieldAlert, ArrowRight, Fingerprint } from 'lucide-react';
import CategoryDetails from '../../components/CategoryDetails';
import heroImg from '../../assets/our_stories/Crafts.webp';

const Crafts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f1eb] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <nav className="text-sm font-medium text-[#8b3f1f]/60">
            <span className="cursor-pointer hover:text-[#8b3f1f]" onClick={() => navigate('/')}>Home</span> 
            <span className="mx-2">/</span> 
            <span className="text-[#5D1010]">Crafts & Industries</span>
          </nav>
          <div className="bg-[#5D1010] text-[#f6f1eb] text-[10px] tracking-[0.2em] font-bold py-1 px-4 rounded-full uppercase animate-pulse">
            Status: Material Loss
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#D4A373]/10 border border-[#D4A373]/20 overflow-hidden">
          <CategoryDetails 
            title="Crafts & Ancient Industries"
            image={heroImg}
            riskLevel="HIGH"
            location="Global (Rural Industrial Hubs)"
            description="Archiving the 'Material Intelligence' of the human hand—from ancient metallurgy to natural fiber weaving."
            details={`Traditional industries are the ultimate proof of human sustainability. For centuries, artisans have crafted tools and textiles using circular systems. Today, mass production and synthetic materials are causing the permanent extinction of manual skills.

            Our platform tracks the 'Tactile Knowledge'—the specific pressure, temperature, and material chemistry known only to master craftsmen. When these industries die, we lose our ability to create without a carbon-heavy global supply chain.`}
            keyFacts={[
              "50% of traditional craft techniques are no longer being taught to youth.",
              "Replacement by plastics has rendered 35% of natural weaving industries extinct.",
              "Manual precision tools are being replaced by automated CNCs, killing specialized artistry.",
              "Archival Benefit: Re-introduces sustainable manufacturing models to the modern world."
            ]}
          />
          
          <div className="p-10 md:p-16 bg-[#fcfaf7] border-t border-[#D4A373]/10">
            <h3 className="text-2xl font-serif font-bold text-[#5D1010] mb-8 text-center">Global Vulnerability Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Hammer className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Skill Obsolescence</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Tracking specific masteries (e.g., traditional ironwork) that have no active apprentices.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Fingerprint className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Material Scarcity</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Monitoring the loss of natural raw materials (clays, dyes, fibers) due to environmental decay.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <ShieldAlert className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Counterfeit Impact</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Detecting the economic collapse of artisanal hubs due to low-quality mass-produced imitations.</p>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-[#5D1010] p-8 rounded-3xl text-white">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-serif font-bold mb-2 text-[#f6f1eb]">Archive a Craft</h3>
                <p className="text-[#f6f1eb]/70 max-w-md">Preserve the material ingenuity of your community before the workshop closes forever.</p>
              </div>
              <button onClick={() => navigate('/preserve')} className="group flex items-center gap-3 bg-[#f6f1eb] text-[#5D1010] px-8 py-4 rounded-full font-bold hover:bg-white transition-all shadow-lg">
                Start Documentation <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-[#8b3f1f]/40 text-xs mt-12 uppercase tracking-widest font-bold">Rune Digital Extinction Tracker © 2026</p>
      </div>
    </div>
  );
};
export default Crafts;