import React from "react"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../components/ui/navigation-menu";
import "../index.css"; // import Tailwind

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#8b3f1f]">

      {/* Navbar */}
      <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo on the left */}
        <div className="font-bold text-xl">Rune</div>

        {/* Navigation Menu in center */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/about">About Us</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white shadow-lg rounded-lg p-4 flex flex-col gap-2">
                <NavigationMenuLink href="#">Story</NavigationMenuLink>
                <NavigationMenuLink href="#">Tradition</NavigationMenuLink>
                <NavigationMenuLink href="#">Language</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Preserve</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logout button on the right */}
        <div>
          <a
            href="#"
            className="border border-[#8b3f1f] px-4 py-1 rounded hover:bg-[#8b3f1f] hover:text-white transition"
          >
            Logout
          </a>
        </div>
      </div>
    </header>



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
          <h2 className="text-2xl font-bold mb-8">Our Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow">
                <img
                  src="https://images.unsplash.com/photo-1526318472351-bc6c2a5c26f4"
                  alt="Story"
                  className="rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Headings</h3>
                  <p className="text-xs text-gray-600 mt-2">
                    Cultural story description goes here.
                  </p>
                  <button className="mt-4 text-sm text-[#8b3f1f] font-semibold">
                    Read more
                  </button>
                </div>
              </div>
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

    {/* <Footer /> */}
    <footer className="bg-white border-t py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
            <div>© 2026 Rune. All rights reserved.</div>
            <div>
            <a href="#" className="text-[#8b3f1f] hover:underline mr-4">Privacy</a>
            <a href="#" className="text-[#8b3f1f] hover:underline">Terms</a>
            </div>
        </div>
    </footer>


    </div>
  )
}
