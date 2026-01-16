import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, History, Clock, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import CategoryDetails from '../../components/CategoryDetails';
import heroImg from '../../assets/our_stories/Tradition.webp';

const Tradition = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f1eb] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <nav className="text-sm font-medium text-[#8b3f1f]/60">
            <span className="cursor-pointer hover:text-[#8b3f1f]" onClick={() => navigate('/')}>Home</span> 
            <span className="mx-2">/</span> 
            <span className="text-[#5D1010]">Tradition & Rituals</span>
          </nav>
          <div className="bg-[#5D1010] text-[#f6f1eb] text-[10px] tracking-[0.2em] font-bold py-1 px-4 rounded-full uppercase animate-pulse">
            Status: Core Identity Loss
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#D4A373]/10 border border-[#D4A373]/20 overflow-hidden">
          <CategoryDetails 
            title="Tradition & Rituals"
            image={heroImg}
            riskLevel="CRITICAL"
            location="Global (Heritage Hotspots)"
            description="Safeguarding the invisible architecture of human belief—the rites of passage and spiritual protocols of the ages."
            details={`Traditions are the roots that hold the soil of identity together. Unlike modern rules, traditions are the 'Spiritual Protocols' that guide birth, marriage, and death. Today, the rapid pace of global consumption is tearing these roots out.

            Our platform tracks the 'Sacred Geography'—the connection between specific rituals and the land. As the world becomes a single digital space, these localized, sacred traditions are at risk of permanent deletion.`}
            keyFacts={[
              "40% of global rites of passage are no longer being practiced by youth.",
              "Spiritual protocols in endangered languages have a 100% risk factor of loss.",
              "90% of ritual mantras are oral-only, with no digital backup currently available.",
              "Archival Benefit: Ensures the structural continuity of indigenous belief systems."
            ]}
          />
          
          <div className="p-10 md:p-16 bg-[#fcfaf7] border-t border-[#D4A373]/10">
            <h3 className="text-2xl font-serif font-bold text-[#5D1010] mb-8 text-center">Global Vulnerability Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <History className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Lineage Decay</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Monitoring spiritual lineages where the chain of initiation has been broken for 2+ generations.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <ShieldCheck className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Protocol Integrity</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Detecting the removal of difficult sacred protocols for the sake of modern convenience.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <ShieldAlert className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Silent Erasure</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Identifying traditions being suppressed by political or religious homogenization movements.</p>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-[#5D1010] p-8 rounded-3xl text-white">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-serif font-bold mb-2 text-[#f6f1eb]">Record a Rite</h3>
                <p className="text-[#f6f1eb]/70 max-w-md">Safeguard the spiritual architecture of your people before it is permanently silenced.</p>
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
export default Tradition;