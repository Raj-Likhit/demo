"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  className?: string;
}

const PEOPLE = [
  { x: -28, y: 252, s: 0.82, row: 0, hair: 0 }, { x: 78, y: 246, s: 0.82, row: 0, hair: 1 },
  { x: 186, y: 254, s: 0.82, row: 0, hair: 2 }, { x: 294, y: 244, s: 0.82, row: 0, hair: 3 },
  { x: 402, y: 251, s: 0.82, row: 0, hair: 1 }, { x: 510, y: 245, s: 0.82, row: 0, hair: 0 },
  { x: 618, y: 253, s: 0.82, row: 0, hair: 2 }, { x: 726, y: 244, s: 0.82, row: 0, hair: 3 },
  { x: 834, y: 252, s: 0.82, row: 0, hair: 1 }, { x: 942, y: 245, s: 0.82, row: 0, hair: 2 },
  { x: 1050, y: 253, s: 0.82, row: 0, hair: 0 }, { x: 1158, y: 244, s: 0.82, row: 0, hair: 3 },
  { x: 1266, y: 252, s: 0.82, row: 0, hair: 1 }, { x: 1374, y: 246, s: 0.82, row: 0, hair: 2 },
  { x: 20, y: 327, s: 0.94, row: 1, hair: 2 }, { x: 150, y: 320, s: 0.94, row: 1, hair: 0 },
  { x: 280, y: 329, s: 0.94, row: 1, hair: 3 }, { x: 410, y: 320, s: 0.94, row: 1, hair: 1 },
  { x: 540, y: 329, s: 0.94, row: 1, hair: 2 }, { x: 670, y: 319, s: 0.94, row: 1, hair: 0 },
  { x: 800, y: 328, s: 0.94, row: 1, hair: 3 }, { x: 930, y: 320, s: 0.94, row: 1, hair: 1 },
  { x: 1060, y: 328, s: 0.94, row: 1, hair: 2 }, { x: 1190, y: 319, s: 0.94, row: 1, hair: 0 },
  { x: 1320, y: 328, s: 0.94, row: 1, hair: 3 },
  { x: -22, y: 390, s: 1.12, row: 2, hair: 1 }, { x: 150, y: 385, s: 1.12, row: 2, hair: 3 },
  { x: 322, y: 393, s: 1.12, row: 2, hair: 0 }, { x: 494, y: 385, s: 1.12, row: 2, hair: 2 },
  { x: 666, y: 393, s: 1.12, row: 2, hair: 1 }, { x: 838, y: 385, s: 1.12, row: 2, hair: 3 },
  { x: 1010, y: 393, s: 1.12, row: 2, hair: 0 }, { x: 1182, y: 385, s: 1.12, row: 2, hair: 2 },
  { x: 1354, y: 393, s: 1.12, row: 2, hair: 1 },
];

function Student({ hair, index }: { hair: number; index: number }) {
  const hairstyles = [
    "M25 41 Q24 8 50 9 Q77 9 76 41 L68 31 Q53 24 31 35 Z",
    "M25 43 Q20 12 48 9 Q79 8 77 39 L70 34 Q61 20 48 27 Q36 35 29 48 Z",
    "M26 37 Q27 10 50 8 Q72 9 75 35 Q65 26 57 25 Q44 31 26 37 Z",
    "M24 41 Q22 11 50 9 Q78 11 76 42 L69 39 Q67 27 61 22 L57 35 L52 22 Q42 25 34 39 Z",
  ];

  return (
    <g data-crowd-person data-crowd-row={index < 14 ? "0" : index < 25 ? "1" : "2"}>
      <path d="M7 150 Q9 112 30 103 L40 98 L60 98 L71 103 Q94 113 96 150Z" fill={index % 2 ? "#111" : "#242424"} />
      <path d="M38 93 L38 106 Q50 116 62 106 L62 93" fill="#fff" stroke="#111" strokeWidth="2" />
      <ellipse cx="50" cy="51" rx="24" ry="29" fill="#fff" stroke="#111" strokeWidth="2.5" />
      <path d={hairstyles[hair]} fill="#111" />
      <circle cx="42" cy="52" r="2" fill="#111" />
      <circle cx="58" cy="52" r="2" fill="#111" />
      <path d="M43 64 Q50 70 57 64" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      {index % 5 === 1 && <g fill="none" stroke="#111" strokeWidth="1.8"><circle cx="42" cy="52" r="6" /><circle cx="58" cy="52" r="6" /><path d="M48 52h4" /></g>}
      <path d="M16 122 Q31 113 40 113 M84 122 Q69 113 60 113" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      {index % 3 !== 1 && (
        <g transform="translate(30 121)">
          <path d="M0 0h40l-4 23H4Z" fill="#fff" stroke="#111" strokeWidth="2" />
          <path d="M17 23v4m-8 1h22" stroke="#111" strokeWidth="2" strokeLinecap="round" />
          <path d="m17 8 4-3 4 3-4 4z" fill="none" stroke="#111" strokeWidth="1.5" />
        </g>
      )}
    </g>
  );
}

export function CrowdCanvas({ className }: CrowdCanvasProps) {
  const sceneRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power2.out" } })
        .fromTo('[data-crowd-row="0"]', { y: 12, opacity: 0 }, { y: 0, opacity: 0.68, duration: 0.7, stagger: 0.035 })
        .fromTo('[data-crowd-row="1"]', { y: 14, opacity: 0 }, { y: 0, opacity: 0.86, duration: 0.7, stagger: 0.04 }, "-=0.3")
        .fromTo('[data-crowd-row="2"]', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.045 }, "-=0.3");
    }, scene);

    return () => context.revert();
  }, []);

  return (
    <svg
      ref={sceneRef}
      aria-hidden="true"
      className={className ?? "absolute inset-0 h-full w-full"}
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
    >
      <defs>
        <linearGradient id="crowd-fade" x1="720" y1="0" x2="720" y2="170" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <mask id="crowd-mask"><rect width="1440" height="520" fill="url(#crowd-fade)" /></mask>
      </defs>
      <g mask="url(#crowd-mask)">
        {PEOPLE.map((person, index) => (
          <g key={index} transform={`translate(${person.x} ${person.y}) scale(${person.s})`}>
            <Student hair={person.hair} index={index} />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function Skiper39() {
  return <div className="relative h-full w-full"><CrowdCanvas /></div>;
}
