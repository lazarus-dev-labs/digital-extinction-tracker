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
import { X, Calendar, User, FileText, CheckCircle, Trash2, ShieldCheck, Clock, Share2 } from "lucide-react";
import { toast } from "react-toastify";

const db = getFirestore(app);

// Types
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
  content?: string;      
  description?: string;  
  category?: string;     
  approved?: boolean;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "stories">("users");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Floating Modal State
  const [selectedStory, setSelectedStory] = useState<StoryType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnap = await getDocs(collection(db, "users"));
        setUsers(userSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserType[]);
        
        const storySnap = await getDocs(collection(db, "stories"));
        setStories(storySnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StoryType[]);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (storyId: string) => {
    try {
      const storyRef = doc(db, "stories", storyId);
      await updateDoc(storyRef, { approved: true });
      setStories((prev) => prev.map((s) => (s.id === storyId ? { ...s, approved: true } : s)));
      setSelectedStory(null);
      toast.success("Story approved successfully!");
    } catch (err) {
      console.error("Error approving:", err);
      toast.error("Failed to approve story. Please try again.");
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "stories", storyId));
      setStories((prev) => prev.filter((s) => s.id !== storyId));
      setSelectedStory(null);
      toast.success("Story deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete story. Please try again.");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      toast.success("User deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  const filteredUsers = users.filter((u) => 
    (u?.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u?.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStories = stories.filter((s) => 
    (s?.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s?.user_name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = stories.filter((s) => s.approved === false || s.approved === undefined).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans selection:text-cyan-200 relative overflow-hidden">
      
      {/* 1. FLOATING STORY DETAIL MODAL (New Feature) */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          {/* Dark Blur Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedStory(null)}
          />

          {/* High-Tech Modal Window */}
          <div className="relative bg-slate-900 border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)] animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md p-6 border-b border-white/5 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <h2 className="text-xs font-mono font-bold text-cyan-400 tracking-widest uppercase">Data Asset Intelligence</h2>
              </div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Story Title */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500 block mb-2">Resource Title</span>
                <h3 className="text-3xl font-bold text-white tracking-tight leading-tight">
                  {selectedStory.title || "UNTITLED_LOG"}
                </h3>
              </div>

              {/* Meta Data Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 group hover:border-cyan-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2 text-cyan-400">
                    <User size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Origin Author</span>
                  </div>
                  <p className="text-sm font-bold text-slate-200">{selectedStory.user_name || "Unknown Identity"}</p>
                </div>
                <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 group hover:border-purple-500/30 transition-all">
                  <div className="flex items-center gap-3 mb-2 text-purple-400">
                    <Share2 size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Protocol Status</span>
                  </div>
                  <p className="text-sm font-bold text-slate-200">{selectedStory.approved ? "Fully Verified" : "Awaiting Clearance"}</p>
                </div>
              </div>

              {/* Encrypted Content Log */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <FileText size={12} /> Full Content Log
                </div>
                <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 leading-relaxed text-slate-300 text-sm whitespace-pre-wrap font-sans selection:bg-cyan-500/40">
                  {selectedStory.content || selectedStory.description || "The data log for this asset is empty or encrypted."}
                </div>
              </div>

              {/* Dynamic Action Controls */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-white/5">
                {!selectedStory.approved && (
                  <button 
                    onClick={() => handleApprove(selectedStory.id)}
                    className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> Authorize Sync
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteStory(selectedStory.id)}
                  className="px-8 bg-red-500/10 hover:bg-red-500/20 text-red-400 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border border-red-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Purge Asset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC BACKGROUND (Preserved) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-80 md:w-[500px] h-80 md:h-[500px] bg-cyan-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* HEADER (Preserved) */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 block">Management System v2.0</span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent leading-none">
              Control Center
            </h1>
            <p className="mt-2 md:mt-4 text-slate-400 font-mono text-xs md:text-sm">
              <span className="text-cyan-400">●</span> {users.length} Nodes <span className="mx-2">|</span> 
              <span className="text-purple-400">●</span> {stories.length} Assets
            </p>
          </div>
          <div className="text-left md:text-right font-mono text-[9px] md:text-[10px] text-slate-500 uppercase leading-relaxed">
            <div className="flex items-center md:justify-end gap-2">
               <ShieldCheck size={10} className="text-emerald-500" /> Network Status: Optimal
            </div>
            <div className="text-cyan-500/80 flex items-center md:justify-end gap-2">
               <Clock size={10} /> Local Sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* STATS GRID (Preserved) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {[
            { label: "Users", val: users.length, color: "border-cyan-500", text: "text-cyan-400" },
            { label: "Stories", val: stories.length, color: "border-purple-500", text: "text-purple-400" },
            { label: "Pending", val: pendingCount, color: "border-pink-500", text: "text-pink-400" },
            { label: "Approved", val: stories.length - pendingCount, color: "border-emerald-500", text: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 ${stat.color}`}>
              <p className={`font-mono text-[9px] md:text-[10px] uppercase tracking-tighter mb-1 ${stat.text}`}>{stat.label}</p>
              <p className="text-xl md:text-3xl font-bold tracking-tight">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* CONTROLS (Preserved) */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-3 md:p-4 mb-6 md:mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("users")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Users
            </button>
            <button 
              onClick={() => setActiveTab("stories")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all relative ${activeTab === 'stories' ? 'bg-purple-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Stories
              {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-pink-500 text-[9px] md:text-[10px] rounded-full flex items-center justify-center border-2 border-slate-900 font-bold">{pendingCount}</span>}
            </button>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search encrypted records..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 md:py-3 pl-11 md:pl-12 pr-4 text-xs md:text-sm outline-none transition-all placeholder:text-slate-600 focus:border-cyan-500/50"
            />
          </div>
        </div>

        {/* CONTENT SECTION (Preserved Responsive Table/Cards) */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  <th className="px-8 py-5">Node Identifier</th>
                  <th className="px-8 py-5">{activeTab === 'users' ? 'Access Path' : 'Origin Source'}</th>
                  <th className="px-8 py-5">Status Token</th>
                  <th className="px-8 py-5 text-right">Operation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeTab === 'users' ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{user.email || "UNIDENTIFIED"}</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">{user.role || "Standard Access"}</p>
                      </td>
                      <td className="px-8 py-5 font-mono text-xs text-slate-400">{user.email || "NO_PATH"}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter border ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-white/10'}`}>
                          {user.status || "inactive"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => handleDeleteUser(user.id)} className="text-[10px] font-bold text-slate-500 hover:text-red-400 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-all uppercase">Purge</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredStories.map((story) => (
                    <tr key={story.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5">
                        {/* FLOATING MODAL TRIGGER */}
                        <button 
                          onClick={() => setSelectedStory(story)}
                          className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors uppercase tracking-tight text-left hover:underline underline-offset-4 decoration-purple-500/30"
                        >
                          {story.title || "UNTITLED_LOG"}
                        </button>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-400 italic">by {story.user_name || "Anonymous"}</td>
                      <td className="px-8 py-5">
                        {story.approved ? (
                          <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VERIFIED</span>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> QUARANTINED</span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right space-x-2">
                        {!story.approved && (
                          <button onClick={() => handleApprove(story.id)} className="text-[10px] font-black text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 rounded-lg transition-all uppercase">Verify</button>
                        )}
                        <button onClick={() => handleDeleteStory(story.id)} className="text-[10px] font-black text-slate-500 hover:text-red-400 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-all uppercase">Purge</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS (Preserved) */}
          <div className="md:hidden divide-y divide-white/5">
            {activeTab === 'users' ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-200 uppercase tracking-tight">{user.name || "UNIDENTIFIED"}</p>
                      <p className="text-[9px] font-mono text-slate-500 uppercase mt-0.5">{user.role || "Standard"}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-white/10'}`}>
                      {user.status || "Inactive"}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-400">{user.email || "NO_PATH"}</p>
                  <button onClick={() => handleDeleteUser(user.id)} className="w-full py-2.5 bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-red-500/20 active:bg-red-500/20">Purge Node</button>
                </div>
              ))
            ) : (
              filteredStories.map((story) => (
                <div key={story.id} className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <button 
                      onClick={() => setSelectedStory(story)}
                      className="font-bold text-slate-200 pr-4 text-left uppercase tracking-tight active:text-purple-400"
                    >
                      {story.title || "UNTITLED_LOG"}
                    </button>
                    {story.approved ? (
                      <span className="text-[9px] font-mono text-emerald-500">VERIFIED</span>
                    ) : (
                      <span className="text-[9px] font-mono text-amber-500">QUARANTINED</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 italic">by {story.user_name || "Anonymous"}</p>
                  <div className="flex gap-2">
                    {!story.approved && (
                      <button onClick={() => handleApprove(story.id)} className="flex-1 py-2.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border border-emerald-500/20">Verify</button>
                    )}
                    <button onClick={() => handleDeleteStory(story.id)} className="flex-1 py-2.5 bg-red-500/10 text-red-400 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg border border-red-500/20">Purge</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {((activeTab === 'users' && filteredUsers.length === 0) || (activeTab === 'stories' && filteredStories.length === 0)) && (
            <div className="py-12 md:py-20 text-center px-4">
              <p className="font-mono text-[10px] md:text-xs text-slate-600 uppercase tracking-[0.3em]">No matching records in local cache</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER (Preserved) */}
      <div className="relative z-10 py-6 text-center border-t border-white/5">
        <p className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
          Secure Terminal // RUNE Protocol // 2026
        </p>
      </div>
    </div>
  );
}