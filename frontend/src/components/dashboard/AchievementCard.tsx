import { Star } from "lucide-react";

export default function AchievementCard() {
  return (
    <div className="bg-white rounded-2xl border shadow p-6 flex flex-col items-center justify-center">
      <h3 className="font-serif text-2xl text-amber-800 mb-6">
        Achievements
      </h3>

      <div className="w-20 h-20 bg-amber-800 rounded-full flex items-center justify-center shadow-lg">
        <Star size={40} className="text-yellow-400" fill="currentColor" />
      </div>
    </div>
  );
}
