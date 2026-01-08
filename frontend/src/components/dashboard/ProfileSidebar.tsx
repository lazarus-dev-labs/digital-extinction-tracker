import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfileSidebar({ user }) {
  return (
    <aside className="sticky top-8 rounded-2xl border border-heritage-primary/20 bg-white shadow-lg p-6 animate-slideLeft font-body">
      
      <div className="flex justify-end mb-4">
        <button className="h-10 w-10 rounded-xl flex items-center justify-center border border-heritage-primary/20 bg-heritage-bg hover:scale-105 transition">
          <Bell className="text-heritage-accent" size={20} />
        </button>
      </div>

      <div className="text-center">
        <img
          src={user.image}
          className="mx-auto h-32 w-32 rounded-2xl border-4 border-heritage-accent shadow"
        />
        <h2 className="mt-4 font-heading text-xl text-heritage-primary">
          {user.name}
        </h2>
      </div>

      <div className="mt-6 space-y-3">
        <Button className="w-full bg-heritage-primary hover:bg-heritage-secondary">
          Edit Profile
        </Button>
        <Button variant="outline" className="w-full border-heritage-primary text-heritage-primary">
          Change Password
        </Button>
      </div>
    </aside>
  );
}
