// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import StoryCard from '../components/categories/StoryCard'; 
// import { Loader2 } from 'lucide-react';

// const CategoryPage = () => {
//   const { categoryName } = useParams(); 
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStories = async () => {
//       setLoading(true);
//       try {
//         // FastAPI endpoint eka (get_items route eka)
//         const response = await axios.get('http://localhost:8000/items'); 
        
//         
//         // URL eke ena name Database eke iti name samaan daya balaya
//         const filtered = response.data.filter(item => 
//           item.category === categoryName
//         );
        
//         setStories(filtered);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStories();
//   }, [categoryName]); 

//   if (loading) return (
//     <div className="flex flex-col items-center justify-center min-h-[60vh]">
//       <Loader2 className="animate-spin text-[#8b4513] mb-4" size={40} />
//       <p className="text-[#8b4513] font-serif">Gathering ancient wisdom...</p>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#fcfaf8] p-6 sm:p-12">
//       <div className="max-w-7xl mx-auto">
//         <header className="mb-12 border-b border-amber-200 pb-6">
//           <h2 className="text-4xl font-serif font-bold text-[#3e2723]">
//             {categoryName}
//           </h2>
//           <p className="text-amber-800 mt-2">Exploring preserved heritage in this category.</p>
//         </header>

//         {stories.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {stories.map((item, index) => (
//               <StoryCard key={index} story={item} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20 border-2 border-dashed border-amber-200 rounded-3xl">
//             <p className="text-gray-500 font-serif italic text-lg">
//               No stories have been preserved under "{categoryName}" yet.
//             </p>
//             <button 
//               onClick={() => window.location.href='/preserve'}
//               className="mt-4 text-[#8b4513] font-bold underline"
//             >
//               Be the first to preserve one!
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;