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
  name: string;
  email: string;
  status: string;
  role?: string;
}

interface StoryType {
  id: string;
  title: string;
  author: string;
  approved: boolean;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingStories, setLoadingStories] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "stories">("users");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserType[];
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch stories
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const snapshot = await getDocs(collection(db, "stories"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as StoryType[];
        setStories(data);
      } catch (err) {
        console.error("Error fetching stories:", err);
      } finally {
        setLoadingStories(false);
      }
    };

    fetchStories();
  }, []);

  // Approve story
  const handleApprove = async (storyId: string) => {
    try {
      const storyRef = doc(db, "stories", storyId);
      await updateDoc(storyRef, { approved: true });
      setStories((prev) =>
        prev.map((s) => (s.id === storyId ? { ...s, approved: true } : s))
      );
    } catch (err) {
      console.error("Error approving story:", err);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const userRef = doc(db, "users", userId);
      await deleteDoc(userRef);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  // Delete story
  const handleDeleteStory = async (storyId: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;
    try {
      const storyRef = doc(db, "stories", storyId);
      await deleteDoc(storyRef);
      setStories((prev) => prev.filter((s) => s.id !== storyId));
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingStories = stories.filter((s) => !s.approved).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Syne', sans-serif;
        }
        
        .mono {
          font-family: 'IBM Plex Mono', monospace;
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.7s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }

        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .glass-effect {
          backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(17, 25, 40, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.125);
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-12 animate-slide-in-left">
            <div className="flex items-end justify-between">
              <div>
                <div className="mono text-xs text-cyan-400 tracking-[0.3em] uppercase mb-2 opacity-80">
                  System Dashboard
                </div>
                <h1 className="text-7xl font-extrabold tracking-tight mb-3">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    Control Center
                  </span>
                </h1>
                <p className="text-slate-400 text-sm mono">
                  Managing {users.length} users • {stories.length} stories
                </p>
              </div>
              <div className="mono text-xs text-slate-500 text-right">
                <div>SESSION ACTIVE</div>
                <div className="text-cyan-400">{new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up">
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 border-l-4 border-cyan-500">
              <div className="mono text-xs text-cyan-400 uppercase tracking-wider mb-2">Total Users</div>
              <div className="text-4xl font-bold">{users.length}</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 border-l-4 border-purple-500">
              <div className="mono text-xs text-purple-400 uppercase tracking-wider mb-2">Total Stories</div>
              <div className="text-4xl font-bold">{stories.length}</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 border-l-4 border-pink-500">
              <div className="mono text-xs text-pink-400 uppercase tracking-wider mb-2">Pending Review</div>
              <div className="text-4xl font-bold">{pendingStories}</div>
            </div>
            <div className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300 border-l-4 border-emerald-500">
              <div className="mono text-xs text-emerald-400 uppercase tracking-wider mb-2">Approved</div>
              <div className="text-4xl font-bold">{stories.length - pendingStories}</div>
            </div>
          </div>

          {/* Tab Navigation & Search */}
          <div className="glass-effect rounded-2xl p-6 mb-6 animate-scale-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "users"
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setActiveTab("stories")}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                    activeTab === "stories"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50"
                      : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  Stories
                  {pendingStories > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold mono">
                      {pendingStories}
                    </span>
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 px-4 py-3 pl-12 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Users Table */}
          {activeTab === "users" && (
            <div className="glass-effect rounded-2xl overflow-hidden animate-slide-in-right">
              {loadingUsers ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="mono text-sm text-slate-400">Loading users...</div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-cyan-400 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-cyan-400 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-cyan-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-cyan-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold mono text-cyan-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                      {filteredUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className="hover:bg-slate-800/30 transition-colors duration-200"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{user.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="mono text-sm text-slate-400">{user.email}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mono ${
                                user.status === "active"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-purple-300">{user.role || "User"}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12 text-slate-500 mono text-sm">
                      No users found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Stories Table */}
          {activeTab === "stories" && (
            <div className="glass-effect rounded-2xl overflow-hidden animate-slide-in-right">
              {loadingStories ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    <div className="mono text-sm text-slate-400">Loading stories...</div>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-pink-400 uppercase tracking-wider">
                          Title
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-pink-400 uppercase tracking-wider">
                          Author
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold mono text-pink-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold mono text-pink-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/30">
                      {filteredStories.map((story, index) => (
                        <tr
                          key={story.id}
                          className="hover:bg-slate-800/30 transition-colors duration-200"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <td className="px-6 py-4">
                            <div className="font-semibold text-white">{story.title}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-400">{story.author}</div>
                          </td>
                          <td className="px-6 py-4">
                            {story.approved ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Approved
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mono bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              {!story.approved && (
                                <button
                                  onClick={() => handleApprove(story.id)}
                                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50 hover:scale-105"
                                >
                                  Approve
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteStory(story.id)}
                                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStories.length === 0 && (
                    <div className="text-center py-12 text-slate-500 mono text-sm">
                      No stories found
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}