import React from "react";
import { Footer } from "../components/ui/Footer";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../components/ui/navigation-menu";
import "../index.css"; // Tailwind

export default function AboutUs() {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-[4.5rem]">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Welcome to <span className="font-semibold">Culture Keeper</span>. 
            Our world has many beautiful stories, old words, and special traditions. 
            But every year, many of these are forgotten. When an old person passes away, sometimes a whole story dies with them.
          </p>
          <p className="text-lg md:text-xl text-gray-700">
            We built this website to stop that.
          </p>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
            alt="Heritage"
            className="rounded-lg w-full md:h-96 h-64 object-cove"
          />
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-[#f1e9df] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-semibold text-xl mb-2">We Listen</h3>
              <p className="text-gray-600 text-sm">
                You can type and save old stories here so they are never lost.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-semibold text-xl mb-2">We Watch</h3>
              <p className="text-gray-600 text-sm">
                Our smart system checks which stories are in "danger" of disappearing.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all">
              <h3 className="font-semibold text-xl mb-2">We Protect</h3>
              <p className="text-gray-600 text-sm">
                By showing what is rare, we help the world save our history before it is gone forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let’s Save Our Roots</h2>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          One word, one story, one tradition at a time.
        </p>
        <button className="bg-[#8b3f1f] text-white px-8 py-3 rounded-md text-lg hover:bg-[#732f17] transition-all">
          Contribute a Story
        </button>
      </section>

      {/* Stats Section */}
      <section className="bg-[#8b3f1f] text-white py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-2xl font-bold">10K+</p>
            <p className="text-sm">Saved Stories</p>
          </div>
          <div>
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Rare Words</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1K+</p>
            <p className="text-sm">Traditions Preserved</p>
          </div>
          <div>
            <p className="text-2xl font-bold">50+</p>
            <p className="text-sm">Active Contributors</p>
          </div>
        </div>
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
  );
}
