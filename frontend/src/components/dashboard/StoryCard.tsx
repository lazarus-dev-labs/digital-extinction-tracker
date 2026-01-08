import { Calendar } from "lucide-react";

interface Story {
  id: number;
  category: string;
  title: string;
  date: string;
  story: string;
  isHighRisk: boolean;
  isVerified: boolean;
}

export default function StoryCard({ story }: { story: Story }) {
  return (
    <div className="bg-amber-50 border rounded-xl p-5 hover:shadow-lg transition">
      <div className="flex justify-between text-xs text-gray-600">
        <span>{story.category}</span>
        <span className="flex gap-1 items-center">
          <Calendar size={12} /> {story.date}
        </span>
      </div>

      <h4 className="font-serif text-lg text-amber-900 mt-2">{story.title}</h4>
      <p className="text-sm text-gray-700 mt-2">{story.story}</p>

      <div className="flex gap-2 mt-4">
        {story.isHighRisk && (
          <span className="bg-red-700 text-white text-xs px-3 py-1 rounded">
            High Risk
          </span>
        )}
        {story.isVerified && (
          <span className="bg-green-700 text-white text-xs px-3 py-1 rounded">
            Verified
          </span>
        )}
      </div>
    </div>
  );
}
