import { ArrowRight, Github, Sparkles } from "lucide-react";
import { CrowdCanvas } from "@/components/ui/skiper39";
import SiteNav from "./site-nav";

export default function HomeHero() {
  return (
    <>
      <SiteNav />
      <section className="relative flex min-h-screen flex-col bg-white">
        {/* Crowd animation - full viewport width */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-16 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_27%,black)]">
          <CrowdCanvas 
            src="https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png" 
            rows={15} 
            cols={7} 
            className="absolute bottom-0 h-[72vh] w-full opacity-90" 
          />
        </div>

        {/* Content container with extra top padding for fixed navbar */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 pt-32 lg:px-10 lg:pt-40">
          <div className="relative max-w-4xl">
            {/* Pill badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/75 px-3 py-1.5 text-xs font-medium text-neutral-600 shadow-sm">
              <Sparkles size={13} className="text-black" /> Your code, in motion
            </div>

            {/* Headline - with white fade backdrop for readability */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-b from-white via-white to-transparent opacity-60 blur-xl" />
              <h1 className="relative max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-black sm:text-7xl lg:text-8xl">
                Momentum for<br />
                <span className="text-neutral-600">makers.</span>
              </h1>
            </div>

            {/* Subtext - with white fade backdrop for readability */}
            <div className="relative mt-7">
              <div className="absolute -inset-4 bg-gradient-to-b from-white to-transparent opacity-70 blur-lg" />
              <p className="relative max-w-md text-base leading-7 text-neutral-600 sm:text-lg">
                DevCatalyst gives ambitious teams one calm place to plan, build, review, and ship what matters next.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-3">
              <a 
                id="start" 
                href="#workflow" 
                className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Build your workspace <ArrowRight className="ml-1 inline" size={16} />
              </a>
              <a 
                href="https://github.com" 
                className="rounded-full border border-black bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-50"
              >
                <Github className="mr-1 inline" size={16} /> Star on GitHub
              </a>
            </div>
          </div>

          {/* Bottom strip - with white fade backdrop for readability */}
          <div className="relative z-10 mt-auto">
            <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-t from-white via-white to-transparent opacity-70 blur-lg" />
            <div className="relative flex items-end justify-between border-t border-neutral-300/70 py-5 text-xs text-neutral-500">
              <span>Built for the people who make the internet.</span>
              <span className="hidden sm:inline">SCROLL TO EXPLORE ↓</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
