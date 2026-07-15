"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CartBar from "@/components/CartBar";
import Footer from "@/components/Footer";
import Dining from "@/components/Dining";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark">
      <Header />
      <Hero />
      <Dining />
      <Footer />
    </main>
  );
}