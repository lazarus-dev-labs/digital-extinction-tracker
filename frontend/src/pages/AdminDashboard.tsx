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
    <div className="min-h-screen bg-[#fcfaf8] text-[#3e2723] selection:bg-amber-200/50 font-sans selection:text-[#3e2723] relative overflow-hidden">
      
      {/* 1. FLOATING STORY DETAIL MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div 
            className="absolute inset-0 bg-[#3e2723]/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedStory(null)}
          />

          <div className="relative bg-white border border-amber-200 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="sticky top-0 bg-white/95 backdrop-blur-md p-6 border-b border-amber-100 flex justify-between items-center z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                <h2 className="text-xs font-mono font-bold text-amber-800 tracking-widest uppercase">Archive Intelligence</h2>
              </div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="p-2 hover:bg-amber-50 rounded-full transition-all hover:rotate-90"
              >
                <X size={20} className="text-[#3e2723]" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-700 block mb-2">Heritage Record</span>
                <h3 className="text-3xl font-serif font-bold text-[#3e2723] tracking-tight leading-tight">
                  {selectedStory.title || "UNTITLED_LOG"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 group transition-all text-[#3e2723]">
                  <div className="flex items-center gap-3 mb-2 text-amber-800">
                    <User size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Preservationist</span>
                  </div>
                  <p className="text-sm font-bold">{selectedStory.user_name || "Unknown Identity"}</p>
                </div>
                <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100 group transition-all">
                  <div className="flex items-center gap-3 mb-2 text-amber-800">
                    <Share2 size={16} />
                    <span className="text-[10px] font-mono uppercase tracking-widest">Clearance Status</span>
                  </div>
                  <p className="text-sm font-bold">{selectedStory.approved ? "Archived & Verified" : "Pending Verification"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-700">
                  <FileText size={12} /> Narrative Logs
                </div>
                <div className="bg-white p-6 rounded-2xl border border-amber-100 leading-relaxed text-[#5d4037] text-sm whitespace-pre-wrap font-sans shadow-inner">
                  {selectedStory.content || selectedStory.description || "The data log for this asset is empty or encrypted."}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-amber-100">
                {!selectedStory.approved && (
                  <button 
                    onClick={() => handleApprove(selectedStory.id)}
                    className="flex-1 bg-[#8b4513] hover:bg-[#5d4037] text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={16} /> Verify Archive
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteStory(selectedStory.id)}
                  className="px-8 bg-red-50 hover:bg-red-100 text-red-700 py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] border border-red-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} /> Purge Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. BACKGROUND DECORATION */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-amber-200 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-24 w-80 md:w-[500px] h-80 md:h-[500px] bg-orange-100 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* HEADER */}
        <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-amber-800 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-2 block font-bold">RUNE Protocol v2.0</span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-[#3e2723] leading-none">
              Control Center
            </h1>
            <p className="mt-2 md:mt-4 text-amber-900/70 font-mono text-xs md:text-sm italic">
              <span className="text-amber-600">●</span> {users.length} Active Nodes <span className="mx-2">|</span> 
              <span className="text-amber-600">●</span> {stories.length} Preserved Assets
            </p>
          </div>
          <div className="text-left md:text-right font-mono text-[9px] md:text-[10px] text-amber-800 uppercase leading-relaxed font-bold">
            <div className="flex items-center md:justify-end gap-2">
               <ShieldCheck size={10} className="text-emerald-700" /> Security: Optimal
            </div>
            <div className="text-amber-900/60 flex items-center md:justify-end gap-2">
               <Clock size={10} /> Last Sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
          {[
            { label: "Total Nodes", val: users.length, color: "border-amber-700", text: "text-amber-900" },
            { label: "Total Assets", val: stories.length, color: "border-amber-800", text: "text-amber-900" },
            { label: "Awaiting Clearance", val: pendingCount, color: "border-orange-500", text: "text-orange-700" },
            { label: "Archived", val: stories.length - pendingCount, color: "border-emerald-600", text: "text-emerald-800" },
          ].map((stat, i) => (
            <div key={i} className={`bg-white shadow-sm border border-amber-100 p-4 md:p-6 rounded-2xl border-l-4 ${stat.color}`}>
              <p className={`font-mono text-[9px] md:text-[10px] uppercase tracking-tighter mb-1 font-bold ${stat.text}`}>{stat.label}</p>
              <p className="text-xl md:text-3xl font-serif font-bold tracking-tight">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* CONTROLS */}
        <div className="bg-white border border-amber-200 rounded-3xl p-3 md:p-4 mb-6 md:mb-8 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
          <div className="flex bg-amber-50 p-1 rounded-xl border border-amber-100 w-full md:w-auto">
            <button 
              onClick={() => setActiveTab("users")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-[#3e2723] text-[#fcfaf8]' : 'text-amber-800 hover:bg-amber-100'}`}
            >
              Users
            </button>
            <button 
              onClick={() => setActiveTab("stories")}
              className={`flex-1 md:flex-none px-4 md:px-8 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold transition-all relative ${activeTab === 'stories' ? 'bg-[#8b4513] text-white' : 'text-amber-800 hover:bg-amber-100'}`}
            >
              Stories
              {pendingCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-orange-600 text-white text-[9px] md:text-[10px] rounded-full flex items-center justify-center border-2 border-white font-bold">{pendingCount}</span>}
            </button>
          </div>

          <div className="relative w-full md:w-80 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-amber-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search archive logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-amber-50/50 border border-amber-200 rounded-xl py-2.5 md:py-3 pl-11 md:pl-12 pr-4 text-xs md:text-sm outline-none transition-all placeholder:text-amber-700/50 focus:bg-white focus:border-amber-500"
            />
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="bg-white border border-amber-200 rounded-3xl overflow-hidden shadow-sm">
          
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-amber-50/50 border-b border-amber-100 text-[10px] uppercase font-mono tracking-widest text-amber-800 font-bold">
                  <th className="px-8 py-5">Record Identifier</th>
                  <th className="px-8 py-5">{activeTab === 'users' ? 'Access Credentials' : 'Contributor'}</th>
                  <th className="px-8 py-5">Protocol Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-50">
                {activeTab === 'users' ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-amber-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-bold text-[#3e2723] group-hover:text-amber-800 transition-colors uppercase tracking-tight">{user.email || "UNIDENTIFIED"}</p>
                        <p className="text-[10px] font-mono text-amber-700/60 uppercase mt-1 font-bold">{user.role || "Standard Access"}</p>
                      </td>
                      <td className="px-8 py-5 font-mono text-xs text-[#5d4037]">{user.email || "NO_PATH"}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-tighter border ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                          {user.status || "inactive"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => handleDeleteUser(user.id)} className="text-[10px] font-bold text-amber-800 hover:text-red-700 px-4 py-2 hover:bg-red-50 rounded-lg transition-all uppercase underline">Purge Node</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  filteredStories.map((story) => (
                    <tr key={story.id} className="group hover:bg-amber-50/30 transition-colors">
                      <td className="px-8 py-5">
                        <button 
                          onClick={() => setSelectedStory(story)}
                          className="font-serif font-bold text-[#3e2723] group-hover:text-amber-800 transition-colors uppercase tracking-tight text-left hover:underline underline-offset-4 decoration-amber-500/30"
                        >
                          {story.title || "UNTITLED_LOG"}
                        </button>
                      </td>
                      <td className="px-8 py-5 text-sm text-[#5d4037] italic font-serif">by {story.user_name || "Anonymous"}</td>
                      <td className="px-8 py-5">
                        {story.approved ? (
                          <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> VERIFIED</span>
                        ) : (
                          <span className="text-[10px] font-mono text-orange-700 font-bold flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> PENDING</span>
                        )}
                      </td>
                      <td className="px-8 py-5 text-right space-x-2">
                        {!story.approved && (
                          <button onClick={() => handleApprove(story.id)} className="text-[10px] font-bold text-white bg-emerald-700 hover:bg-emerald-800 px-4 py-2 rounded-lg transition-all uppercase shadow-sm">Authorize</button>
                        )}
                        <button onClick={() => handleDeleteStory(story.id)} className="text-[10px] font-bold text-amber-800 hover:text-red-700 px-4 py-2 hover:bg-red-50 rounded-lg transition-all uppercase">Purge</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden divide-y divide-amber-50">
            {activeTab === 'users' ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-[#3e2723] uppercase tracking-tight">{user.name || "UNIDENTIFIED"}</p>
                      <p className="text-[9px] font-mono text-amber-800 uppercase mt-0.5">{user.role || "Standard"}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                      {user.status || "Inactive"}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#5d4037]">{user.email || "NO_PATH"}</p>
                  <button onClick={() => handleDeleteUser(user.id)} className="w-full py-2.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg border border-red-100 active:bg-red-100">Purge Node</button>
                </div>
              ))
            ) : (
              filteredStories.map((story) => (
                <div key={story.id} className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <button 
                      onClick={() => setSelectedStory(story)}
                      className="font-serif font-bold text-[#3e2723] pr-4 text-left uppercase tracking-tight active:text-amber-800"
                    >
                      {story.title || "UNTITLED_LOG"}
                    </button>
                    {story.approved ? (
                      <span className="text-[9px] font-mono text-emerald-700 font-bold">VERIFIED</span>
                    ) : (
                      <span className="text-[9px] font-mono text-orange-700 font-bold">PENDING</span>
                    )}
                  </div>
                  <p className="text-xs text-[#5d4037] italic font-serif">by {story.user_name || "Anonymous"}</p>
                  <div className="flex gap-2">
                    {!story.approved && (
                      <button onClick={() => handleApprove(story.id)} className="flex-1 py-2.5 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-[0.1em] rounded-lg shadow-sm">Authorize</button>
                    )}
                    <button onClick={() => handleDeleteStory(story.id)} className="flex-1 py-2.5 bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-[0.1em] rounded-lg border border-amber-200">Purge</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {((activeTab === 'users' && filteredUsers.length === 0) || (activeTab === 'stories' && filteredStories.length === 0)) && (
            <div className="py-12 md:py-20 text-center px-4">
              <p className="font-mono text-[10px] md:text-xs text-amber-900/40 uppercase tracking-[0.3em]">No archive records found in current sector</p>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 py-6 text-center border-t border-amber-100">
        <p className="font-mono text-[9px] text-amber-900/40 uppercase tracking-widest font-bold">
          Archive Terminal // RUNE Protocol // 2026
        </p>
      </div>
    </div>
  );
}