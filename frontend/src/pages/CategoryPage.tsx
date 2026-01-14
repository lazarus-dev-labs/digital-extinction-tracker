import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import StoryCard from "../components/categories/StoryCard";
import { Loader2, Filter } from "lucide-react";
import { api } from "@/api/api";

const VALID_CATEGORIES = [
  "Tradition & Rituals",
  "Arts & Performance",
  "Knowledge & Practices",
  "Crafts & Industries",
  "Festivals & Social Events",
];

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState(categoryName || "All");
  const [filterRiskLevel, setFilterRiskLevel] = useState("All");
  const [minRiskScore, setMinRiskScore] = useState(0);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(20);

  useEffect(() => {
    setVisibleCount(20);
  }, [selectedCategory, filterRiskLevel, minRiskScore]);


  useEffect(() => {
    if (categoryName) {
        setSelectedCategory(categoryName);
    }
  }, [categoryName]);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const result = await api.get("stories").json();
        // console.log("Fetched stories:", result);
        if (Array.isArray(result)) {
            setStories(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []); // Fetch once, filter locally

  const filteredStories = useMemo(() => {
    if (!stories.length) return [];
    
    return stories.filter((story) => {
        const matchesCategory = selectedCategory === "All" || story.category === selectedCategory;
        const matchesRiskLevel = filterRiskLevel === "All" || story.risk_level === filterRiskLevel;
        const matchesRiskScore = (story.risk_score || 0) >= minRiskScore;

        // 1. Filter by Category
        if (!matchesCategory) return false;

        // 2. Filter by Risk Level
        if (!matchesRiskLevel) return false;

        // 3. Filter by Risk Score
        if (!matchesRiskScore) return false;

        return true;
    });
  }, [stories, selectedCategory, filterRiskLevel, minRiskScore]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-[#8b4513] mb-4" size={40} />
        <p className="text-[#8b4513] font-serif">Gathering ancient wisdom...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fcfaf8] p-6 sm:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 border-b border-amber-200 pb-6">
          <h2 className="text-4xl font-serif font-bold text-[#3e2723]">
            {selectedCategory === "All" ? "All Categories" : selectedCategory}
          </h2>
          <p className="text-amber-800 mt-2">
            Exploring preserved heritage in this category.
          </p>
        </header>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center flex-wrap">
            <div className="flex items-center gap-2 text-[#8b4513] font-bold">
                <Filter size={20} />
                Filters
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">Category:</label>
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-amber-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 bg-amber-50/50"
                >
                    <option value="All">All Categories</option>
                    {VALID_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 font-medium">Risk Level:</label>
                <select 
                    value={filterRiskLevel}
                    onChange={(e) => setFilterRiskLevel(e.target.value)}
                    className="border border-amber-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20 bg-amber-50/50"
                >
                    <option value="All">All Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

            <div className="flex items-center gap-2">
                 <label className="text-sm text-gray-600 font-medium">Min Risk Score: {minRiskScore}</label>
                 <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.1"
                    value={minRiskScore}
                    onChange={(e) => setMinRiskScore(parseFloat(e.target.value))}
                    className="accent-[#8b4513] cursor-pointer"
                 />
            </div>
        </div>

        {filteredStories.slice(0, visibleCount).length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStories.slice(0, visibleCount).map((item, index) => (
                <StoryCard key={index} story={item} />
                ))}
            </div>
            
            <div className="flex flex-col items-center mt-12 gap-4">
                <p className="text-amber-800/60 font-medium font-serif">
                    Showing {Math.min(visibleCount, filteredStories.length)} out of {filteredStories.length} stories
                </p>
                
                {visibleCount < filteredStories.length && (
                    <button 
                        onClick={() => setVisibleCount(prev => prev + 10)}
                        className="bg-[#8b4513] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3e2723] transition-colors shadow-lg hover:shadow-xl"
                    >
                        Show More Stories
                    </button>
                )}
            </div>
          </>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-amber-200 rounded-3xl">
            <p className="text-gray-500 font-serif italic text-lg">
              No stories found matching your criteria.
            </p>
            <button
              onClick={() => (window.location.href = "/preserve")}
              className="mt-4 text-[#8b4513] font-bold underline"
            >
              Be the first to preserve one!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
