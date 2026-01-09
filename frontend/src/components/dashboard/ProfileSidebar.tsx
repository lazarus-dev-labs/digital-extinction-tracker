import { Button } from "@/components/ui/button";
import { Bell, Check, Star } from "lucide-react";

interface User {
  name: string;
  username: string;
  email: string;
  role: string;
  country: string;
  language: string;
  contact: string;
  image: string;
  reach: string;
  contributions: number;
}

interface StatProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

interface DetailProps {
  label: string;
  value: string;
}

export default function ProfileSidebar({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6 sticky top-6">
      <div className="flex justify-end">
        <button className="p-2 rounded-lg bg-amber-100 hover:bg-amber-200">
          <Bell size={18} />
        </button>
      </div>

      <div className="text-center">
        <img
          src={user.image}
          className="w-32 h-32 mx-auto rounded-full border-2 border-amber-400"
        />
        <h2 className="mt-4 font-serif text-xl text-amber-900">
          {user.name}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Stat label="Reach" value={user.reach} icon={<Check />} />
        <Stat label="Contributions" value={user.contributions} icon={<Star />} />
      </div>

      <div className="mt-6 space-y-2 text-sm">
        <Detail label="Username" value={user.username} />
        <Detail label="Email" value={user.email} />
        <Detail label="Role" value={user.role} />
        <Detail label="Contact" value={user.contact} />
        <Detail label="Language" value={user.language} />
        <Detail label="Country" value={user.country} />
      </div>

      <div className="mt-6 space-y-2">
        <Button className="w-full bg-amber-800 hover:bg-amber-900">
          Edit Profile
        </Button>
        <Button variant="outline" className="w-full">
          Change Password
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: StatProps) {
  return (
    <div className="bg-amber-50 rounded-xl p-3 text-center">
      <div className="flex justify-center gap-1 items-center text-amber-800">
        {icon}
        <span className="font-bold">{value}</span>
      </div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function Detail({ label, value }: DetailProps) {
  return (
    <div>
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="text-gray-800">{value}</div>
    </div>
  );
}
