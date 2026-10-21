"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Section background mapping (read-only from codebase inspection)
const SECTION_THEMES: Record<string, "light" | "dark"> = {
  "": "light",            // hero/top - white background
  "workflow": "dark",      // bg-[#15251a] - dark green/black
  "about": "light",        // bg-[#f8f7f4] - off-white
  "gallery": "light",      // bg-[#e9ece5] - light beige
  "testimonials": "light", // bg-white - white
  "faq": "light",          // bg-gradient light blue to white
};

const NAV_LINKS = [
  { label: "Workflow", href: "#workflow" },
  { label: "About us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function SiteNav() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const reducedMotion = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = mediaQuery.matches;
    
    const handleChange = (e: MediaQueryListEvent) => {
      reducedMotion.current = e.matches;
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Get all sections
    const sections = [
      { element: document.querySelector("section") as HTMLElement, id: "" }, // Hero section (first)
      ...Object.keys(SECTION_THEMES)
        .filter(id => id !== "")
        .map(id => ({ element: document.getElementById(id), id }))
        .filter(({ element }) => element !== null) as { element: HTMLElement; id: string }[]
    ];

    const updateTheme = () => {
      const scrollY = window.scrollY;
      const navbarCenter = 56; // Approximate center of navbar

      // Find which section is at the navbar center
      for (const { element, id } of sections) {
        const rect = element.getBoundingClientRect();
        const absoluteTop = scrollY + rect.top;
        const absoluteBottom = absoluteTop + element.offsetHeight;

        // Check if navbar center is within this section
        if (scrollY + navbarCenter >= absoluteTop && scrollY + navbarCenter < absoluteBottom) {
          const newTheme = SECTION_THEMES[id] || "light";
          setTheme(newTheme);
          break;
        }
      }
    };

    // Throttled scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
        updateTheme();
        rafRef.current = undefined;
      });
    };

    // Initial check
    updateTheme();

    // Use scroll event with RAF throttling
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTheme, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTheme);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const isDark = theme === "dark";
  const transitionClass = reducedMotion.current ? "" : "transition-all duration-[400ms] ease-in-out";

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-[9998] flex justify-center pt-6">
        <div className="flex items-start gap-3 px-6 lg:px-10">
          {/* Logo circle */}
          <a
            href="#"
            className={`flex size-14 shrink-0 items-center justify-center rounded-full border backdrop-blur-xl overflow-hidden ${transitionClass} ${
              isDark
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-black/10 bg-white/60 text-black hover:bg-white/80"
            }`}
            style={{ 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label="DevCatalyst home"
          >
            <div className="relative size-[56px]">
              {/* Light mode logo */}
              <img
                src="/logo-light.svg"
                alt="DevCatalyst"
                className={`absolute inset-0 size-full ${transitionClass} ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
              />
              {/* Dark mode logo */}
              <img
                src="/logo-dark.svg"
                alt="DevCatalyst"
                className={`absolute inset-0 size-full ${transitionClass} ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </a>

          {/* Desktop nav pill */}
          <div
            className={`hidden items-center gap-8 rounded-full border backdrop-blur-xl px-8 py-4 md:flex ${transitionClass} ${
              isDark
                ? "border-white/20 bg-white/10 text-white"
                : "border-black/10 bg-white/60 text-black"
            }`}
            style={{ 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${transitionClass} ${
                  isDark ? "hover:text-white/70" : "hover:text-black/60"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`flex size-14 shrink-0 items-center justify-center rounded-full border backdrop-blur-xl md:hidden ${transitionClass} ${
              isDark
                ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
                : "border-black/10 bg-white/60 text-black hover:bg-white/80"
            }`}
            style={{ 
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Mobile menu panel */}
          {mobileOpen && (
            <div
              className={`absolute left-6 right-6 top-20 flex flex-col gap-2 rounded-2xl border backdrop-blur-xl p-4 md:hidden ${transitionClass} ${
                isDark
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-black/10 bg-white/60 text-black"
              }`}
              style={{ 
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium ${transitionClass} ${
                    isDark ? "hover:bg-white/10" : "hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Click outside to close mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9997] md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
