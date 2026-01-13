import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import ProfileSidebar from "@/components/dashboard/ProfileSidebar";
import ImpactCard from "@/components/dashboard/ImpactCard";
import AchievementCard from "@/components/dashboard/AchievementCard";
import SavedStories from "@/components/dashboard/SavedStories";
import SourceConnections from "@/components/dashboard/SourceConnections";

// Match the Story type exactly with SavedStories
interface Story {
  id: number;
  category: string;
  title: string;
  date: string;
  story: string;
  isHighRisk: boolean;
  isVerified: boolean;
}

export default function UserDashboard() {
  const { user } = useAuth()!;
  const navigate = useNavigate();

  const [stories, setStories] = useState<Story[]>([]); // Empty initially

  // Redirect admin to admin dashboard
  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/admindashboard", { replace: true });
  }, [user, navigate]);

  if (!user || user.role === "admin") return null;

  const dashboardUser = {
    name: user.displayName || "Guardian",
    username: user.displayName ? `@${user.displayName.replace(/\s/g, "")}` : "@Guardian",
    email: user.email || "No email found",
    role: "Cultural Member",
    country: "Sri Lanka",
    language: "Sinhala / English",
    contact: user.phoneNumber || "Not provided",
    image: user.photoURL || `https://ui-avatars.com/api/?name=${user?.email}&background=8b3f1f&color=fff`,
    reach: "0",
    contributions: 0,
  };

  const impact = {
    reach: 0,
    contributions: 0,
    impact: 1,     // Example value
    highRisk: 0,   // Must be a number for ImpactCard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] via-[#f0ebe3] to-[#e8dfd2] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <ProfileSidebar user={dashboardUser} />
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
