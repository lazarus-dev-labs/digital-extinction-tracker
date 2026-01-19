// frontend/src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";
import app from "@/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X, CheckCircle, Trash2, FileText } from "lucide-react";

const db = getFirestore(app);

interface UserType {
  id: string;
  name?: string;
  email?: string;
  status?: string;
  role?: string;
}

interface StoryType {
  id: string;
  title?: string;
  user_name?: string;
  description?: string;
  category?: string;
  language?: string;
  time_period?: string;
  region?: string;
  risk_score?: number | string;
  digital_presence_score?: number | string;
  approved?: boolean;
}

// Type guards
const isUser = (item: UserType | StoryType): item is UserType =>
  "email" in item;

const isStory = (item: UserType | StoryType): item is StoryType =>
  "title" in item;

const Meta = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 flex flex-col">
    <span className="text-[10px] font-mono uppercase text-slate-500">{label}</span>
    <span className="text-sm font-bold text-slate-200">{value ?? "—"}</span>
  </div>
);

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "stories">("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState<StoryType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnap = await getDocs(collection(db, "users"));
        setUsers(userSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as UserType[]);

        const storySnap = await getDocs(collection(db, "stories"));
        setStories(storySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as StoryType[]);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatNumber = (value?: number | string) => {
    if (value == null) return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : num.toFixed(2);
  };

  const handleApprove = async (storyId: string) => {
    try {
      const storyRef = doc(db, "stories", storyId);
      await updateDoc(storyRef, { approved: true });
      setStories((prev) =>
        prev.map((s) => (s.id === storyId ? { ...s, approved: true } : s))
      );
      setSelectedStory(null);
      toast.success("Story approved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve story.");
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      await deleteDoc(doc(db, "stories", storyId));
      setStories((prev) => prev.filter((s) => s.id !== storyId));
      setSelectedStory(null);
      toast.success("Story deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete story.");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("User deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      (u.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStories = stories.filter(
    (s) =>
      (s.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.user_name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = stories.filter((s) => !s.approved).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            onClick={() => setSelectedStory(null)}
          />
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-lg p-6">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-4 border-b flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">
                  Data Asset Intelligence
                </h2>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <h3 className="text-3xl font-bold text-white">{selectedStory.title || "UNTITLED_LOG"}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Meta label="Origin Author" value={selectedStory.user_name || "Unknown"} />
                <Meta label="Protocol Status" value={selectedStory.approved ? "Fully Verified" : "Awaiting Clearance"} />
                <Meta label="Category" value={selectedStory.category} />
                <Meta label="Language" value={selectedStory.language} />
                <Meta label="Time Period" value={selectedStory.time_period} />
                <Meta label="Region" value={selectedStory.region} />
                <Meta label="Risk Score" value={formatNumber(selectedStory.risk_score)} />
                <Meta label="Digital Presence" value={formatNumber(selectedStory.digital_presence_score)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <FileText size={12} /> Full Content Log
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 text-sm text-slate-300 whitespace-pre-wrap">
                  {selectedStory.description || "No content available."}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
                {!selectedStory.approved && (
                  <button
                    onClick={() => handleApprove(selectedStory.id)}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-xl font-black text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> Authorize Sync
                  </button>
                )}
                <button
                  onClick={() => handleDeleteStory(selectedStory.id)}
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl font-black text-xs uppercase tracking-[0.1em] flex items-center justify-center gap-2 border border-red-500/20"
                >
                  <Trash2 size={16} /> Purge Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header & Controls */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-2 block">
              Management System v2.0
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 leading-none">
              Control Center
            </h1>
            <p className="mt-2 md:mt-4 text-slate-400 font-mono text-xs md:text-sm">
              <span className="text-cyan-400">●</span> {users.length} Nodes{" "}
              <span className="mx-2">|</span>
              <span className="text-purple-400">●</span> {stories.length} Assets
            </p>
          </div>
        </header>

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden mb-6 flex flex-col md:flex-row gap-4 items-center justify-between p-3">
          <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
                activeTab === "users" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab("stories")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 rounded-lg text-xs md:text-sm font-bold transition-all relative ${
                activeTab === "stories" ? "bg-purple-500 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Stories
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-pink-500 text-[9px] md:text-[10px] rounded-full flex items-center justify-center border-2 border-slate-900 font-bold">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 bg-slate-950/50 border border-white/10 rounded-xl py-2.5 md:py-3 pl-3 text-xs md:text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Table */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  <th className="px-8 py-5">Identifier</th>
                  <th className="px-8 py-5">{activeTab === "users" ? "Access" : "Origin"}</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === "users" ? filteredUsers : filteredStories).map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-5 font-bold text-slate-200 uppercase tracking-tight">
                      {isUser(item) ? item.email : item.title}
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-400">
                      {isUser(item) ? item.role : item.user_name ?? "Anonymous"}
                    </td>
                    <td className="px-8 py-5">
                      {isUser(item)
                        ? item.status ?? "inactive"
                        : item.approved
                        ? "Verified"
                        : "Pending"}
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      {isStory(item) && (
                        <button
                          onClick={() => setSelectedStory(item)}
                          className="text-[10px] font-black text-cyan-400 hover:bg-cyan-500/10 px-4 py-2 rounded-lg transition-all uppercase"
                        >
                          View
                        </button>
                      )}
                      {isStory(item) && !item.approved && (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="text-[10px] font-black text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 rounded-lg transition-all uppercase"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() =>
                          isUser(item) ? handleDeleteUser(item.id) : handleDeleteStory(item.id)
                        }
                        className="text-[10px] font-black text-slate-500 hover:text-red-400 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-all uppercase"
                      >
                        Purge
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4 p-4">
            {(activeTab === "users" ? filteredUsers : filteredStories).map((item) => (
              <div
                key={item.id}
                className="bg-slate-950/50 p-4 rounded-2xl border border-white/5 flex flex-col gap-2"
                onClick={() => isStory(item) && setSelectedStory(item)}
              >
                <p className="font-bold text-slate-200">{isUser(item) ? item.email : item.title}</p>
                <p className="text-xs text-slate-400">{isUser(item) ? item.role : item.user_name ?? "Anonymous"}</p>
                <div className="flex gap-2 mt-2">
                  {isStory(item) && !item.approved && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApprove(item.id);
                      }}
                      className="flex-1 text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-lg uppercase"
                    >
                      Verify
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      isUser(item) ? handleDeleteUser(item.id) : handleDeleteStory(item.id);
                    }}
                    className="flex-1 text-[10px] font-black text-red-400 bg-red-500/10 px-4 py-2 rounded-lg uppercase"
                  >
                    Purge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}