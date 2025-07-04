import React from "react";

export default function ProtocolWhySection() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden min-h-[480px] py-24 bg-[#2a155a]">
      {/* SVG Arcs with animated dots and lines */}
      <svg
        className="absolute left-1/2 top-0 -translate-x-1/2 z-0"
        width="1800"
        height="700"
        viewBox="0 0 1800 700"
        fill="none"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        {/* Main arcs */}
        <path
          d="M100 700 Q900 -350 1700 700"
          stroke="#5d37b9"
          strokeWidth="90"
          fill="none"
        />
        <path
          d="M200 700 Q900 -170 1600 700"
          stroke="#432181"
          strokeWidth="60"
          fill="none"
        />
        {/* Animated dots */}
        <circle>
          <animateMotion
            dur="7s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            path="M200 700 Q900 -170 1600 700"
          />
          <animate attributeName="fill" values="#48eecf;#fec84b;#48eecf" dur="7s" repeatCount="indefinite"/>
        </circle>
        <circle r="12" fill="#48eecf">
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            path="M200 700 Q900 -170 1600 700"
            begin="2s"
          />
        </circle>
        <circle r="8" fill="#fec84b">
          <animateMotion
            dur="10s"
            repeatCount="indefinite"
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
            path="M100 700 Q900 -350 1700 700"
            begin="4s"
          />
        </circle>
        {/* Accent lines */}
        <path
          d="M330 570 Q830 70 1330 570"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M520 650 Q900 180 1280 650"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M200 500 Q900 60 1600 500"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.25"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#2a155a] mb-3 drop-shadow-lg text-center">
          Why a Blockchain Protocol?
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 text-center">
          Because it's <span className="text-[#fff176]">100% Transparent &amp; Fair</span>
        </h3>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl text-center mb-8">
          Smart contracts automate the game with unchangeable rules. This makes every draw provably fair, transparent, and open for anyone—no middlemen, no hidden fees.
        </p>
        <a
          href="#why"
          className="border border-white text-white rounded-lg px-7 py-3 font-semibold text-lg hover:bg-white/10 transition"
        >
          Learn how it works
        </a>
      </div>
    </section>
  );
}