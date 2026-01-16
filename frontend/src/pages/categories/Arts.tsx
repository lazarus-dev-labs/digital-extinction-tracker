import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Music, Clock, ShieldAlert, ArrowRight, Eye } from 'lucide-react';
import CategoryDetails from '../../components/CategoryDetails';
import heroImg from '../../assets/our_stories/Arts.webp';

const Arts = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f1eb] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <nav className="text-sm font-medium text-[#8b3f1f]/60">
            <span className="cursor-pointer hover:text-[#8b3f1f]" onClick={() => navigate('/')}>Home</span> 
            <span className="mx-2">/</span> 
            <span className="text-[#5D1010]">Arts & Performance</span>
          </nav>
          <div className="bg-[#5D1010] text-[#f6f1eb] text-[10px] tracking-[0.2em] font-bold py-1 px-4 rounded-full uppercase animate-pulse">
            Status: Sensory Erasure
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#D4A373]/10 border border-[#D4A373]/20 overflow-hidden">
          <CategoryDetails 
            title="Arts & Performance"
            image={heroImg}
            riskLevel="CRITICAL"
            location="Global (Minority Ethnic Groups)"
            description="Protecting the non-verbal history of mankind—dance, shadow puppetry, and ritual music on the verge of silence."
            details={`Art is the soul's primary language. While written history can be faked, the physical performance of a dance or a ritual chant carries an emotional honesty that defines a civilization. Today, the global 'Attention Economy' is deleting the patient practice required for traditional arts.

            The Digital Extinction Tracker captures the 'Sensory DNA'—drum rhythms that affect brain waves, mask dances that tell moral tales, and storytelling techniques that survive only in the shadows of villages.`}
            keyFacts={[
              "45% of ethnic musical instruments are no longer being manufactured.",
              "Shadow puppetry and oral storytelling have seen a 90% decline in audiences since 2000.",
              "Vocal techniques (e.g., throat singing, ritual chanting) are losing their original acoustic purity.",
              "Archival Benefit: Prevents the acoustic and visual erasure of ethnic identity."
            ]}
          />
          
          <div className="p-10 md:p-16 bg-[#fcfaf7] border-t border-[#D4A373]/10">
            <h3 className="text-2xl font-serif font-bold text-[#5D1010] mb-8 text-center">Global Vulnerability Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Music className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Acoustic Extinction</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Recording unique instrument frequencies before the last artisans stop producing them.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Eye className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Visual Erosion</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Preserving the complex choreography and costume science of ritual performers.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <ShieldAlert className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Commercial Mimicry</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Protecting traditional arts from being 'flattened' for fast-paced digital consumption.</p>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-[#5D1010] p-8 rounded-3xl text-white">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-serif font-bold mb-2 text-[#f6f1eb]">Submit a Performance</h3>
                <p className="text-[#f6f1eb]/70 max-w-md">Digitally immortalize the colors, sounds, and movements of your culture's artistic soul.</p>
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
export default Arts;