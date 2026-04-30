"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-12 md:py-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-accent-green/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent-red/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-gold/3 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <div className="relative h-28 w-28 md:h-36 md:w-36 mb-6 animate-fade-in-up">
            <Image
              src="/logo.png"
              alt="The Real Spice Logo"
              fill
              className="object-contain drop-shadow-[0_8px_24px_rgba(107,122,47,0.2)]"
              priority
            />
          </div>

          {/* Tagline */}
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase text-accent-green font-medium mb-3 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Authentic Indian Cuisine
          </p>

          {/* Title */}
          <h1
            className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl font-bold gradient-text mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            The Real Spice
          </h1>

          {/* Divider */}
          <div
            className="w-24 h-[2px] bg-gradient-to-r from-transparent via-accent-green to-transparent mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          />

          {/* Description */}
          <p
            className="max-w-lg text-text-secondary text-sm md:text-base leading-relaxed mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            Fresh, hot and delicious — handcrafted with love using the finest
            spices. Experience the true taste of India, delivered from our
            kitchen to your doorstep.
          </p>

          {/* CTA */}
          <a
            href="#menu"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-accent-red px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-red-light hover:shadow-[0_8px_30px_rgba(198,40,40,0.35)] animate-fade-in-up"
            style={{ animationDelay: "0.45s" }}
          >
            <span>Explore Our Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
