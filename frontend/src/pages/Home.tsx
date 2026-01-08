import React from "react"
import CardForHome from "../components/cards/CardForHome"
import "../index.css"; // import Tailwind
// import Sample1 from "../assets/Sample1.png" 

export default function Home() {
  // 1. Define your data
  const stories = [
    {
      id: 1,
      title: "Ancient Architecture",
      description: "Exploring the intricate stone carvings and structural marvels of our ancestors.",
      image: "../Sample1"
    },
    {
      id: 2,
      title: "Traditional Crafts",
      description: "Preserving the delicate art of hand-woven textiles passed down through generations.",
      image: "https://images.unsplash.com/photo-1590739293993-908061e3895e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Folklore & Wisdom",
      description: "Recording the oral histories and legends that define our cultural identity.",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600"
    }
  ];
  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#8b3f1f]">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold mb-4 leading-[5.5rem]">
            Discover and <br /> Preserve Your <br /> Cultural Heritage
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Preserve rare stories, traditions, and knowledge for future generations.
          </p>
          <button className="bg-[#8b3f1f] text-white px-6 py-2 rounded hover:bg-[#8b3f1f]/90 transition">
            Contact Us
          </button>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="Heritage"
            className="rounded-lg w-full md:h-96 h-64 object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-full shadow text-sm">
            30K Preserved Resources
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="bg-[#f1e9df] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-[#9F3B0F]">Our Stories</h2>
          
          {/* 2. Map through the data */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <CardForHome 
                key={story.id}
                title={story.title}
                description={story.description}
                image={story.image}
              />
            ))}
          </div>
        </div>
      </section>


      {/* Reviews Section */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold mb-8">Reviews and Comments</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded shadow">
              <div className="text-yellow-400">★★★★★</div>
              <h4 className="font-semibold mt-2">Review title</h4>
              <p className="text-xs text-gray-600">Review body</p>
              <p className="text-xs mt-2">Reviewer name</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#8b3f1f] text-white py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold">70K</p>
            <p className="text-sm">Shared Hosting</p>
          </div>
          <div>
            <p className="text-2xl font-bold">100M</p>
            <p className="text-sm">Resources</p>
          </div>
          <div>
            <p className="text-2xl font-bold">11K</p>
            <p className="text-sm">Dedicated Server</p>
          </div>
          <div>
            <p className="text-2xl font-bold">199+</p>
            <p className="text-sm">Viewers</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="space-y-3 md:pr-6">
        <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
            Have Any Questions or need Help? Fill Out The Form Below, <br />
            And We’ll Get Back To You As Soon As Possible.
        </p>
        <p className="text-sm text-gray-600 mb-1">📞 +94 77 123 3456</p>
        <p className="text-sm text-gray-600">✉️ Lazarus.it@gmail.com</p>
        </div>
        <form className="bg-white p-6 rounded shadow space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Name" />
          <input className="w-full border p-2 rounded" placeholder="Email" />
          <input className="w-full border p-2 rounded" placeholder="Subject" />
          <textarea className="w-full border p-2 rounded" placeholder="Message" />
          <button className="bg-[#8b3f1f] text-white px-6 py-2 rounded">
            Submit Message
          </button>
        </form>
      </section>
    </div>
  )
}
