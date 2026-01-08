import ProfileSidebar from "@/components/dashboard/ProfileSidebar";
import ImpactCard from "@/components/dashboard/ImpactCard";
import AchievementCard from "../components/dashboard/AchievementCard";
import SavedStories from "../components/dashboard/SavedStories";
import SourceConnections from "../components/dashboard/SourceConnections";

export default function UserDashboard() {
  const user = {
    name: "Minoka Induwara",
    username: "@Minoka",
    email: "minoka21@gmail.com",
    role: "Student",
    country: "Sri Lanka",
    language: "Sinhala",
    contact: "+94 77 123 4567",
    image: "/api/placeholder/128/128",
    reach: "1.23k",
    contributions: 23,
  };

  const impact = {
    impact: 15,
    highRisk: 2,
  };

  const stories = [
    {
      id: 1,
      category: "Folklore",
      title: "The Legend of the Serpent King",
      date: "12.12.2022",
      story:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      isHighRisk: true,
      isVerified: true,
    },
    {
      id: 2,
      category: "Mythology",
      title: "Ancient Guardian Spirits",
      date: "05.08.2023",
      story:
        "Sed do eiusmod tempor incididunt ut labore...",
      isHighRisk: false,
      isVerified: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f0ebe3] to-[#e8dfd2] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <ProfileSidebar user={user} />
        </div>

        <div className="lg:col-span-9 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <ImpactCard data={impact} />
            <AchievementCard />
          </div>

          <SavedStories stories={stories} />
          <SourceConnections />
        </div>
      </div>
    </div>
  );
}
