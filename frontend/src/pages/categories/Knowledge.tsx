import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, BookOpen, Clock, ShieldAlert, ArrowRight, Lightbulb } from 'lucide-react';
import CategoryDetails from '../../components/CategoryDetails';
import heroImg from '../../assets/our_stories/Knowledge.webp';

const Knowledge = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f1eb] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <nav className="text-sm font-medium text-[#8b3f1f]/60">
            <span className="cursor-pointer hover:text-[#8b3f1f]" onClick={() => navigate('/')}>Home</span> 
            <span className="mx-2">/</span> 
            <span className="text-[#5D1010]">Knowledge & Practices</span>
          </nav>
          <div className="bg-[#5D1010] text-[#f6f1eb] text-[10px] tracking-[0.2em] font-bold py-1 px-4 rounded-full uppercase animate-pulse">
            Status: Systemic Erosion
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#D4A373]/10 border border-[#D4A373]/20 overflow-hidden">
          <CategoryDetails 
            title="Knowledge & Practices"
            image={heroImg}
            riskLevel="HIGH"
            location="Global (Indigenous Territories)"
            description="Preserving the 'Living Libraries' of nature—ancient medicine, weather forecasting, and ecological wisdom."
            details={`Traditional Ecological Knowledge (TEK) is humanity's oldest data set. It contains thousands of years of observations on climate, sustainable agriculture, and biodiversity. As indigenous languages vanish and rural lifestyles collapse, this 'Human Hard Drive' is being formatted.

            Rune's goal is to digitize these practices so modern science can integrate ancient wisdom into global sustainability efforts. When we lose a traditional healer or an elder farmer, we lose a unique way of understanding the planet.`}
            keyFacts={[
              "70% of medicinal plant knowledge is held by single oral lineages.",
              "Modern industrial farming has displaced 40% of native agricultural practices.",
              "Traditional weather forecasting accuracy is 25% higher in local climates than satellite models.",
              "Archival Benefit: Creates a decentralized database for future climate resilience."
            ]}
          />
          
          <div className="p-10 md:p-16 bg-[#fcfaf7] border-t border-[#D4A373]/10">
            <h3 className="text-2xl font-serif font-bold text-[#5D1010] mb-8 text-center">Global Vulnerability Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <Lightbulb className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Intellectual Decay</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Tracking the loss of specialized botanical and chemical knowledge in rural areas.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <BookOpen className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Oral Ledger Loss</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Mapping regions where local knowledge is no longer being converted to text or digital media.</p>
              </div>
              <div className="group bg-white p-8 rounded-2xl border border-[#D4A373]/20 hover:border-[#8b3f1f] transition-all duration-300 shadow-sm">
                <div className="w-12 h-12 bg-[#f6f1eb] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#8b3f1f] transition-colors">
                  <ShieldAlert className="text-[#8b3f1f] group-hover:text-white" size={24} />
                </div>
                <h4 className="font-bold text-[#8b3f1f] mb-3">Biopiracy Watch</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Preventing the unauthorized commercial patenting of indigenous community knowledge.</p>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row items-center justify-between bg-[#5D1010] p-8 rounded-3xl text-white">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-serif font-bold mb-2 text-[#f6f1eb]">Register Knowledge</h3>
                <p className="text-[#f6f1eb]/70 max-w-md">Help us build the vault of human ingenuity before the last 'living libraries' are gone.</p>
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
export default Knowledge;