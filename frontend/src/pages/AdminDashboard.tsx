import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import app from "@/firebase";
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
  author?: string;
  approved?: boolean;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "stories">("users");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as UserType[];
        setUsers(data);
      } catch (err) { console.error("Error fetching users:", err); }
      finally { setLoadingUsers(false); }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "stories"));
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as StoryType[];
        setStories(data);
      } catch (err) { console.error("Error fetching stories:", err); }
      finally { setLoadingStories(false); }
    };
    fetchStories();
  }, []);

  const handleApprove = async (storyId: string) => {
    try {
      const storyRef = doc(db, "stories", storyId);
      await updateDoc(storyRef, { approved: true });
      setStories((prev) => prev.map((s) => (s.id === storyId ? { ...s, approved: true } : s)));
    } catch (err) { console.error("Error approving story:", err); }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "users", userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) { console.error(err); }
  };

  const handleDeleteStory = async (storyId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, "stories", storyId));
      setStories((prev) => prev.filter((s) => s.id !== storyId));
    } catch (err) { console.error(err); }
  };

  const filteredUsers = users.filter((u) => 
    (u?.name ?? "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (u?.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStories = stories.filter((s) => 
    (s?.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s?.author ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingCount = stories.filter((s) => s.approved === false || s.approved === undefined).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-cyan-500/30 font-sans selection:text-cyan-200 relative overflow-hidden">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-left duration-700">
          <div>
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 block">Management System v2.0</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
              Control Center
            </h1>
            <p className="mt-4 text-slate-400 font-mono text-sm">
              <span className="text-cyan-400">●</span> {users.length} Active Nodes <span className="mx-2">|</span> 
              <span className="text-purple-400">●</span> {stories.length} Data Assets
            </p>
          </div>
          <div className="hidden md:block text-right font-mono text-[10px] text-slate-500 uppercase leading-relaxed">
            <div>Network Status: Optimal</div>
            <div className="text-cyan-500/80">Local Sync: {new Date().toLocaleTimeString()}</div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-in fade-in slide-in-from-bottom duration-700 delay-100">
          {[
            { label: "Users", val: users.length, color: "border-cyan-500", text: "text-cyan-400" },
            { label: "Stories", val: stories.length, color: "border-purple-500", text: "text-purple-400" },
            { label: "Pending", val: pendingCount, color: "border-pink-500", text: "text-pink-400" },
            { label: "Approved", val: stories.length - pendingCount, color: "border-emerald-500", text: "text-emerald-400" },
          ].map((stat, i) => (
            <div key={i} className={`bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl border-l-4 ${stat.color} hover:bg-slate-800/40 transition-all cursor-default`}>
              <p className={`font-mono text-[10px] uppercase tracking-tighter mb-1 ${stat.text}`}>{stat.label}</p>
              <p className="text-3xl font-bold tracking-tight">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between animate-in zoom-in-95 duration-500">
          <div className="flex bg-slate-950/50 p-1 rounded-xl border border-white/5 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("users")}
              className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Users
            </button>
            <button 
              onClick={() => setActiveTab("stories")}
              className={`flex-1 md:flex-none px-8 py-2.5 rounded-lg text-sm font-bold transition-all relative ${activeTab === 'stories' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Stories
              {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-[10px] rounded-full flex items-center justify-center border-2 border-slate-900 font-bold">{pendingCount}</span>}
            </button>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Filter database..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right duration-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase font-mono tracking-widest text-slate-500">
                  <th className="px-8 py-5">Core Identifier</th>
                  <th className="px-8 py-5">{activeTab === 'users' ? 'Access Path' : 'Source'}</th>
                  <th className="px-8 py-5">Status Token</th>
                  <th className="px-8 py-5 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeTab === 'users' ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{user.name || "UNIDENTIFIED"}</p>
                        <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">{user.role || "Standard User"}</p>
                      </td>
                      <td className="px-8 py-5 font-mono text-xs text-slate-400">{user.email || "NO_DATA"}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter border ${user.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-500/10 text-slate-400 border-white/10'}`}>
                          {user.status || "Inactive"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => handleDeleteUser(user.id)} className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors px-4 py-2 hover:bg-red-500/10 rounded-lg">Purge</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredStories.map((story) => (
                    <tr key={story.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-200 group-hover:text-purple-400 transition-colors">{story.title || "UNTITLED_LOG"}</p>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-400 italic">by {story.author || "Anonymous"}</td>
                      <td className="px-8 py-5">
                        {story.approved ? (
                          <span className="text-[10px] font-mono text-emerald-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> VERIFIED</span>
                        ) : (
                          <span className="text-[10px] font-mono text-amber-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> QUARANTINED</span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right space-x-2">
                        {!story.approved && (
                          <button onClick={() => handleApprove(story.id)} className="text-xs font-bold text-emerald-400 hover:bg-emerald-500/10 px-4 py-2 rounded-lg transition-all">Authorize</button>
                        )}
                        <button onClick={() => handleDeleteStory(story.id)} className="text-xs font-bold text-slate-500 hover:text-red-400 px-4 py-2 hover:bg-red-500/10 rounded-lg transition-all">Purge</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {((activeTab === 'users' && filteredUsers.length === 0) || (activeTab === 'stories' && filteredStories.length === 0)) && (
              <div className="py-20 text-center">
                <p className="font-mono text-xs text-slate-600 uppercase tracking-[0.3em]">No matching records found in local cache</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}