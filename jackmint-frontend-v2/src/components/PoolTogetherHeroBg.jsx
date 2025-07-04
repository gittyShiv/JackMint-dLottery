import React from "react";
import bird from "../assets/bird.svg"; // Assuming you have a bird SVG asset

// Animated Bird SVG (with optional scale/flip for reuse)
function Bird({ x = 0, y = 0, scale = 1, flip = false }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale} ${scale * (flip ? -1 : 1)})`}
    >
      {/* Body: main circle */}
      <ellipse cx="0" cy="0" rx="32" ry="22" fill="#a385ff" />
      {/* Wing: semi-circle */}
      <path
        d="M-11,0 a11,11 0 0,0 22,0"
        fill="#8252ff"
        transform="rotate(-20 -1 7)"
      />
      {/* Head: circle */}
      <circle cx="20" cy="-16" r="16" fill="#a385ff" />
      {/* Beak: triangle */}
      <polygon
        points="34,-12 54,-8 34,-4"
        fill="#fec84b"
        transform="rotate(-10 34 -8)"
      />
      {/* Eye */}
      <circle cx="27" cy="-18" r="3.5" fill="#2a155a" />
      {/* Leg */}
      <rect x="-6" y="18" width="8" height="20" rx="4" fill="#fec84b" />
      {/* Foot */}
      <ellipse cx="-2" cy="38" rx="8" ry="4" fill="#fec84b" />
    </g>
  );
}

// Sparkle Effect
function Sparkle({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="10" fill="#fec84b" />
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1="0"
          x2={Math.cos((Math.PI * 2 * i) / 8) * 22}
          y2={Math.sin((Math.PI * 2 * i) / 8) * 22}
          stroke="#16ffe0"
          strokeWidth="2"
        />
      ))}
    </g>
  );
}

export default function PoolTogetherHeroBg({ children }) {
  return (
    <section className="relative w-full min-h-[600px] flex items-center bg-[#2a155a] overflow-hidden pt-12 pb-0">
      {/* SVG Background */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1470 760"
        fill="none"
        aria-hidden="true"
        style={{ minHeight: 600, pointerEvents: "none" }}
        preserveAspectRatio="none"
      >
        {/* Background shapes */}
        <rect x="0" y="400" width="1470" height="400" fill="#311b6e" />
        <rect x="0" y="0" width="1470" height="760" fill="url(#bgGrad)" />
        <g opacity="0.10">
          <ellipse cx="1200" cy="100" rx="160" ry="90" fill="#a385ff" />
        </g>
        {/* Pipes */}
        <path
          d="M100 680 Q400 620 600 480 Q900 220 1200 400 Q1360 500 1370 700"
          stroke="#432181"
          strokeWidth="38"
          fill="none"
          strokeLinecap="round"
          filter="url(#pipeShadow)"
        />
        {/* Lower pipe */}
        <path
          d="M230 720 Q350 740 480 680 Q620 610 700 680 Q800 770 1120 760"
          stroke="#5d37b9"
          strokeWidth="26"
          fill="none"
          opacity="0.75"
        />
        {/* Short vertical pipe */}
        <path
          d="M1080 360 Q1080 520 1200 600"
          stroke="#2a155a"
          strokeWidth="26"
          fill="none"
          opacity="0.7"
        />
        {/* Accent circles and lines */}
        <g opacity="0.27">
          <circle cx="1350" cy="130" r="40" stroke="#a385ff" strokeWidth="7" fill="none" />
          <circle cx="1350" cy="130" r="18" stroke="#5d37b9" strokeWidth="7" fill="none" />
        </g>
        {/* Prize grid (bottom right) */}
        <g>
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 32 }).map((_, col) => (
              <circle
                key={row * 32 + col}
                cx={1110 + col * 10}
                cy={720 + row * 10}
                r="4.2"
                fill={["#16ffe0", "#fec84b", "#a385ff", "#fff176"][col % 4]}
                opacity="0.8"
              />
            ))
          )}
        </g>
        {/* Sparkle */}
        {/* <Sparkle x={260} y={420} /> */}
        {/* Animated balls along pipes */}
        <circle r="11" fill="#fec84b">
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            path="M100 680 Q400 620 600 480 Q900 220 1200 400 Q1360 500 1370 700"
          />
        </circle>
        <circle r="9" fill="#16ffe0">
          <animateMotion
            dur="8.5s"
            repeatCount="indefinite"
            path="M230 720 Q350 740 480 680 Q620 610 700 680 Q800 770 1120 760"
            begin="3s"
          />
        </circle>
        <circle r="7" fill="#a385ff">
          <animateMotion
            dur="6.5s"
            repeatCount="indefinite"
            path="M1080 360 Q1080 520 1200 600"
            begin="2s"
          />
        </circle>
        {/* Birds */}
        <Bird x={200} y={410} scale={1.1} />
        <Bird x={1350} y={58} scale={0.85} flip />
        {/* (Optional: second sparkle, more birds, more balls as needed) */}
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a155a" />
            <stop offset="100%" stopColor="#311b6e" />
          </linearGradient>
          <filter id="pipeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.22" />
          </filter>
        </defs>
      </svg>
      {/* Content goes here, in a relatively positioned container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-start gap-8 px-8 py-8">
        {children}
      </div>
    </section>
  );
}