import React from "react";
import { useNavigate } from "react-router-dom";
import CardForHome from "../components/cards/CardForHome";
import "../index.css"; 

import HeroImg from "../assets/Front_Img.webp";
import our_stories_img1 from "../assets/our_stories/Angampora_Secret_Maneuvers.webp"
import our_stories_img2 from "../assets/our_stories/Archaic_Healing_Dialects.webp"
import our_stories_img3 from "../assets/our_stories/Lost_Chena_Cultivation_Songs.webp"
import our_stories_img4 from "../assets/our_stories/Harvest_Moon.webp"
import our_stories_img5 from "../assets/our_stories/Wave_Reading_Navigation.webp"

export default function Home() {
  const navigate = useNavigate();

  // 1. Cultural Data with Metadata for Cards
  const stories = [
    {
      id: 1,
      title: "The Ritual of the Harvest Moon",
      description: "An ancient agricultural ceremony performed by elders in the central highlands to ensure a fertile season.",
      image: our_stories_img4,
      location: "Meemure",
      risk: "High",
      sourceAge: "88",
      category: "Ritual"
    },
    {
      id: 2,
      title: "Archaic Healing Dialects",
      description: "Specific chants used in folk medicine that contain words no longer found in modern dictionaries.",
      image: our_stories_img2,
      location: "Galle",
      risk: "Critical",
      sourceAge: "92",
      category: "Language"
    },
    {
      id: 3,
      title: "Lost Chena Cultivation Songs",
      description: "Rhythmic verses sung by farmers to keep away wild animals and coordinate community labor.",
      image: our_stories_img3,
      location: "Anuradhapura",
      risk: "Medium",
      sourceAge: "74",
      category: "Folklore"
    },
    {
      id: 4,
      title: "Angampora Secret Maneuvers",
      description: "Defensive techniques and pressure point knowledge preserved within a single lineage of martial artists.",
      image: our_stories_img1,
      location: "Ratnapura",
      risk: "High",
      sourceAge: "81",
      category: "Tradition"
    },
    {
      id: 5,
      title: "Wave-Reading Navigation",
      description: "Ancient methods used by coastal communities to predict weather patterns by observing sea currents.",
      image: our_stories_img5,
      location: "Matara",
      risk: "Medium",
      sourceAge: "79",
      category: "Knowledge"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#8b3f1f] font-sans">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight md:leading-[1.2]">
            Discover and <br className="hidden md:block" /> Preserve Your <br className="hidden md:block" /> Cultural Heritage
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Preserve rare stories, traditions, and ancient knowledge before they vanish. Join our mission to digitize human history.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate("/preserve")}
              className="bg-[#8b3f1f] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#70301a] shadow-lg transition-all"
            >
              Start Preserving
            </button>
            <button 
              onClick={() => navigate("/about")}
              className="border-2 border-[#8b3f1f] text-[#8b3f1f] px-8 py-3 rounded-lg font-bold hover:bg-[#8b3f1f] hover:text-white transition-all"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <img
            src={HeroImg}
            alt="Heritage Conservation"
            className=" w-full h-[300px] md:h-[500px] object-cover "
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden lg:block border border-[#f1e9df]">
             <p className="text-3xl font-bold text-[#8b3f1f]">500+</p>
             <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Dialects Tracked</p>
          </div>
        </div>
      </section>

      {/* Stories Section with Horizontal Scroll */}
      <section className="bg-[#f1e9df] py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5D1010] mb-2 font-serif">Our Stories</h2>
              <p className="text-gray-600">Scroll to explore the digital vault.</p>
            </div>
            <div className="hidden md:flex gap-2">
              {/* Navigation Hints */}
              <p className="text-xs font-bold text-[#8b3f1f]/50 uppercase tracking-widest">Swipe to explore →</p>
            </div>
          </div>

          {/* The Scroll Container */}
          <div className="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory scrollbar-hide">
            {stories.map((story) => (
              <div 
                key={story.id} 
                className="min-w-full sm:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] snap-center"
              >
                <CardForHome {...story} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Updated for your Project Context */}
      <section className="bg-[#5D1010] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold mb-1">12K+</p>
            <p className="text-xs uppercase tracking-widest opacity-80">Ancient Stories</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">45</p>
            <p className="text-xs uppercase tracking-widest opacity-80">Lost Dialects</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">800+</p>
            <p className="text-xs uppercase tracking-widest opacity-80">Verified Elders</p>
          </div>
          <div>
            <p className="text-4xl font-bold mb-1">High</p>
            <p className="text-xs uppercase tracking-widest opacity-80">Risk Coverage</p>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Voices of the Community</h2>
          <p className="text-gray-600">What researchers and guardians say about Rune.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Dr. Aruni S.", role: "Historian", text: "A vital tool for preserving the fading echoes of our mountain rituals." },
            { name: "Sahan Perera", role: "Contributor", text: "The audio recording feature allowed me to save my grandfather's folk songs easily." },
            { name: "Global Heritage Org", role: "Partner", text: "The risk tracking algorithm is a game changer for cultural prioritization." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="text-yellow-500 mb-4 text-xl">★★★★★</div>
              <p className="text-gray-700 italic mb-6">"{item.text}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-[#8b3f1f]">{item.name}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tighter">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-[#5D1010]">Get In Touch</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
                Have a lead on an endangered tradition? Need help accessing the archive? <br />
                Our team is here to support your preservation journey.
            </p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#f1e9df] rounded-full text-[#8b3f1f]">📞</div>
                <p className="font-semibold text-gray-700">+94 77 123 3456</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#f1e9df] rounded-full text-[#8b3f1f]">✉️</div>
                <p className="font-semibold text-gray-700">lazarus.it@gmail.com</p>
              </div>
            </div>
          </div>
          <form className="bg-[#f6f1eb] p-8 md:p-10 rounded-2xl shadow-inner space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input 
                className="w-full bg-white border border-[#8b3f1f]/30 p-4 rounded-lg focus:outline-none focus:border-[#8b3f1f] focus:ring-1 focus:ring-[#8b3f1f] transition-all" 
                placeholder="First Name" 
              />
              <input 
                className="w-full bg-white border border-[#8b3f1f]/30 p-4 rounded-lg focus:outline-none focus:border-[#8b3f1f] focus:ring-1 focus:ring-[#8b3f1f] transition-all" 
                placeholder="Last Name" 
              />
            </div>
            
            <input 
              className="w-full bg-white border border-[#8b3f1f]/30 p-4 rounded-lg focus:outline-none focus:border-[#8b3f1f] focus:ring-1 focus:ring-[#8b3f1f] transition-all" 
              placeholder="Email Address" 
            />
            
            {/* Corrected Textarea with visible borders */}
            <textarea 
              rows={4} 
              className="w-full bg-white border border-[#8b3f1f]/30 p-4 rounded-lg focus:outline-none focus:border-[#8b3f1f] focus:ring-1 focus:ring-[#8b3f1f] transition-all resize-none" 
              placeholder="How can we help preserve history today?" 
            />
            
            <button className="w-full bg-[#8b3f1f] text-white py-4 rounded-lg font-bold shadow-lg hover:bg-[#70301a] transition-all">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}