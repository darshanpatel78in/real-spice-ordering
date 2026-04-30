import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-border-subtle">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-green to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-accent-green/30">
                <Image
                  src="/logo.png"
                  alt="The Real Spice"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-[family-name:var(--font-playfair)] text-lg font-bold text-text-primary">
                  The Real Spice
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-accent-gold/70">
                  Authentic Cuisine
                </p>
              </div>
            </div>
            <p className="text-sm text-text-muted text-center md:text-left leading-relaxed">
              Handcrafted with the finest spices. Bringing the true taste of
              India to your doorstep since 2024.
            </p>
          </div>

          {/* Hours */}
          <div className="text-center">
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4">
              Opening Hours
            </h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <p>Monday – Saturday</p>
              <p className="text-accent-gold font-medium">
                11:00 AM – 10:00 PM
              </p>
              <p className="mt-3">Sunday</p>
              <p className="text-accent-gold font-medium">
                12:00 PM – 9:00 PM
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="font-[family-name:var(--font-playfair)] text-base font-semibold text-text-primary mb-4">
              Get in Touch
            </h3>
            <div className="space-y-2 text-sm text-text-secondary">
              <p className="flex items-center justify-center md:justify-end gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-accent-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
                +91 94082 27397
              </p>
              <p className="flex items-center justify-center md:justify-end gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-accent-green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                Surat, Gujarat
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border-subtle text-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} The Real Spice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
