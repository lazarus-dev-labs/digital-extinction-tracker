import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Users, Clock, ShieldAlert, ArrowRight, Heart } from 'lucide-react';
import CategoryDetails from '../../components/CategoryDetails';
import heroImg from '../../assets/our_stories/Festivals.webp';

const Festivals = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f1eb] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <nav className="text-sm font-medium text-[#8b3f1f]/60">
            <span className="cursor-pointer hover:text-[#8b3f1f]" onClick={() => navigate('/')}>Home</span> 
            <span className="mx-2">/</span> 
            <span className="text-[#5D1010]">Festivals & Social Events</span>
          </nav>
          <div className="bg-[#5D1010] text-[#f6f1eb] text-[10px] tracking-[0.2em] font-bold py-1 px-4 rounded-full uppercase animate-pulse">
            Status: Critical Exposure
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#D4A373]/10 border border-[#D4A373]/20 overflow-hidden">
          <CategoryDetails 
            title="Festivals & Social Events"
            image={heroImg}
            riskLevel="CRITICAL"
            location="Global Monitoring (Inter-Continental)"
            description="Tracking the erosion of communal synchronization—from spiritual solstice gatherings to ancestral harvest celebrations."
            details={`Festivals are the heartbeat of human synchronization. They represent the moment when a community's 'Social Software' runs at full capacity. Today, these events are facing extinction due to climate displacement and the 'Global Homogenization' of culture, where local dates are replaced by global commercial holidays.

            When a festival dies, the specific community bond it creates is deleted. Our tracker focuses on the 'Ceremonial Logic'—the unique prayers, social hierarchies, and seasonal timings that are being lost as villages urbanize.`}
            keyFacts={[
              "35% of communal rituals globally are undocumented.",
              "Climate displacement has halted 20% of land-based solstice rites.",
              "Youth participation in traditional social structures has fallen by 60%.",
              "Archival Benefit: Prevents the permanent loss of communal rhythm."
            ]}
          />
          
          <div className="p-10 md:p-16 bg-[#fcfaf7] border-t border-[#D4A373]/10">
            <h3 className="text-2xl font-serif font-bold text-[#5D1010] mb-8 text-center">Global Vulnerability Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Globe className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Displacement Risks</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Monitoring festivals lost when indigenous tribes are forced out of their ancestral lands.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Clock className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Transmission Gap</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Identifying festivals where the median age of organizers exceeds 70 years.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <ShieldAlert className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Integrity Watch</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Detecting the dilution of sacred rituals into commercialized tourist performances.</p>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-[#5D1010] p-8 rounded-3xl text-white">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-serif font-bold mb-2 text-[#f6f1eb]">Archive a Festival</h3>
                <p className="text-[#f6f1eb]/70 max-w-md">Contribute to the global ledger of communal rites before they vanish into history.</p>
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
export default Festivals;