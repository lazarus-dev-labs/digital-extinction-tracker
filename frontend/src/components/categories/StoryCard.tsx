import React from 'react';
import { ShieldAlert, ShieldCheck, MapPin } from 'lucide-react';

const StoryCard = ({ story }: { story: any }) => {
  // Backend switched values indicate
  const displayLevel = story.risk_score; // "High", "Low" words
  const displayScore = story.risk_level; // 0.8, 0.2 numbers

  return (
    <div className="bg-white rounded-2xl border border-amber-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-amber-50 text-[#8b4513] text-[10px] px-2 py-1 rounded font-bold uppercase">
          {story.language}
        </span>
        <div className={`flex items-center text-xs font-bold ${displayLevel === 'High' ? 'text-red-600' : 'text-green-600'}`}>
          {displayLevel === 'High' ? <ShieldAlert size={14} className="mr-1" /> : <ShieldCheck size={14} className="mr-1" />}
          {displayLevel} Risk ({displayScore})
        </div>
      </div>

      <h3 className="text-xl font-bold text-[#3e2723] mb-2">{story.title}</h3>
      <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">{story.description}</p>

      <div className="pt-4 border-t border-gray-50 flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center">
          <MapPin size={12} className="mr-1" /> {story.region}
        </div>
        <button className="text-[#8b4513] font-bold hover:underline">Read Legacy</button>
      </div>
    </div>
  );
};

export default StoryCard;