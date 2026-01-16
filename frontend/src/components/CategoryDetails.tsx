import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, MapPin, CheckCircle2 } from 'lucide-react';

interface CategoryDetailProps {
  title: string;
  description: string;
  details: string;
  image: string;
  riskLevel: string;
  location: string;
  keyFacts: string[];
}

const CategoryDetail: React.FC<CategoryDetailProps> = ({ 
  title, description, details, image, riskLevel, location, keyFacts 
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f1eb]">
      {/* Hero Section */}
      <div className="relative h-[450px] w-full">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-10">
          <button 
            onClick={() => navigate("/")} 
            className="absolute top-6 left-6 flex items-center gap-2 text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-md transition"
          >
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div className="max-w-7xl mx-auto w-full mb-6">
            <span className="bg-[#8b3f1f] text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
              Extinction Tracker Active
            </span>
            <h1 className="text-5xl font-bold text-white mt-4">{title}</h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-3xl font-bold text-[#5D1010] mb-4 font-serif">Historical Overview</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#e8dfd5]">
            <h2 className="text-2xl font-bold text-[#3e2723] mb-4">The Preservation Archive</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-base">{details}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#3e2723] mb-6">Key Threats & Tracker Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyFacts.map((fact, index) => (
                <div key={index} className="flex items-start gap-3 p-5 bg-[#8b3f1f]/5 rounded-xl border-l-4 border-[#8b3f1f]">
                  <CheckCircle2 className="text-[#8b3f1f] shrink-0 mt-1" size={18} />
                  <p className="text-gray-700 text-sm font-medium leading-snug">{fact}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side (Tracker Status) */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-md border-t-8 border-red-700">
            <div className="flex items-center gap-2 text-red-700 mb-4 font-bold uppercase text-xs tracking-tighter">
              <AlertTriangle size={18} /> <span>Extinction Risk Score</span>
            </div>
            <div className="text-5xl font-black text-red-700 mb-2">{riskLevel}</div>
            <p className="text-sm text-gray-500 italic leading-relaxed">
              This score indicates the urgency of digitization required to prevent permanent loss.
            </p>
          </div>

          <div className="bg-[#3e2723] text-[#f6f1eb] p-8 rounded-2xl shadow-md">
            <div className="flex items-center gap-2 mb-4 font-bold text-xs uppercase opacity-70">
              <MapPin size={18} /> <span>Geographic Focus</span>
            </div>
            <p className="text-xl font-medium">{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;