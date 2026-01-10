// 

import React from "react";
import { useAuth } from "../hooks/AuthContext"; // 1. Import your auth hook
import ProfileSidebar from "@/components/dashboard/ProfileSidebar";
import ImpactCard from "@/components/dashboard/ImpactCard";
import AchievementCard from "../components/dashboard/AchievementCard";
import SavedStories from "../components/dashboard/SavedStories";
import SourceConnections from "../components/dashboard/SourceConnections";

export default function UserDashboard() {
  // 2. Get the real user from your AuthContext
  const { user: authUser } = useAuth()!;

  // 3. Map the Firebase user data to the format your Sidebar expects
  const user = {
    name: authUser?.displayName || "Guardian", // Use Google Name or default
    username: authUser?.displayName ? `@${authUser.displayName.replace(/\s/g, '')}` : "@Guardian",
    email: authUser?.email || "No email found",
    role: "Cultural Member", // Default role
    country: "Sri Lanka",
    language: "Sinhala / English",
    contact: authUser?.phoneNumber || "Not provided",
    // Use Google profile picture, or a fallback placeholder
    image: authUser?.photoURL || `https://ui-avatars.com/api/?name=${authUser?.email}&background=8b3f1f&color=fff`,
    reach: "0", 
    contributions: 0,
  };

  const impact = {
    impact: 0,
    highRisk: 0,
  };

  // Keep these as empty for now until you fetch real stories from Firestore
  const stories: any[] = []; 

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