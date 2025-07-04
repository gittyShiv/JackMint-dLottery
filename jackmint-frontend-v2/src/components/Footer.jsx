import React from "react";

// SVG ICONS (all 32x32 canvas, visually centered)
const icons = {
  x: (
<svg width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="40" height="40" rx="8" fill="#000"/>
  <path d="M11 10h5.8l6.2 8.8 5.7-8.8H29l-7.6 10.4L29 30h-5.8l-6.1-8.7-5.9 8.7H11l7.8-10.7L11 10Zm2.9 1.1 12 15.8h2l-12-15.8h-2Z" fill="#fff"/>
</svg>
  ),
  github: (
    <svg width="38" height="38" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#211F32"/>
      <path fill="#fff" d="M16 9c-3.87 0-7 3.13-7 7 0 3.09 2 5.66 4.78 6.59.35.06.48-.15.48-.34v-1.21c-1.95.42-2.36-.94-2.36-.94-.32-.82-.78-1.04-.78-1.04-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.08 1.64.77 2.04.59.06-.46.25-.77.45-.95-1.56-.18-3.2-.78-3.2-3.49 0-.77.27-1.4.71-1.89-.07-.18-.31-.91.07-1.89 0 0 .59-.19 1.92.72A6.65 6.65 0 0 1 16 12.68c.6.003 1.21.08 1.78.24 1.33-.91 1.92-.72 1.92-.72.38.98.14 1.71.07 1.89.44.49.71 1.12.71 1.89 0 2.71-1.65 3.31-3.22 3.49.26.23.49.68.49 1.37v2.03c0 .19.13.41.49.34C21 21.66 23 19.09 23 16c0-3.87-3.13-7-7-7z"/>
    </svg>
  ),
  instagram: (
    <svg width="38" height="38" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#211F32"/>
      <rect x="9" y="9" width="14" height="14" rx="5" stroke="#fff" strokeWidth="2"/>
      <circle cx="16" cy="16" r="4.5" stroke="#fff" strokeWidth="2"/>
      <circle cx="21" cy="12" r="1.4" fill="#16ffe0"/>
    </svg>
  ),
  
};

const chainlinkLogo = (
  <svg width="32" height="32" viewBox="0 0 250 250" fill="none">
    <polygon points="125,30 210,75 210,175 125,220 40,175 40,75" fill="#2A5ADA"/>
    <polygon points="125,50 193,87 193,163 125,200 57,163 57,87" fill="#fff"/>
    <polygon points="125,75 172,100 172,150 125,175 78,150 78,100" fill="#2A5ADA"/>
  </svg>
);


export default function Footer() {
  return (
    <footer className="bg-[#211F32] px-4 md:px-12 pt-12 pb-6 mt-16 text-white relative">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo, made with love, Chainlink */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center space-x-2 text-sm text-white/80">
            <span>Made with</span>
            <span className="text-red-500 text-lg">♥</span>
            <span>by the Shivam Maurya</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            {/* Chainlink logo here */}
             {chainlinkLogo}
            <span className="ml-2 text-[#16ffe0] text-sm font-semibold">
              Powered by Chainlink VRF
            </span>
          </div>
        </div>
        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-4 mb-1">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-11 h-11 flex items-center justify-center hover:scale-110 transition"
            >
              {icons.x}
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-11 h-11 flex items-center justify-center hover:scale-110 transition"
            >
              {icons.github}
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 flex items-center justify-center hover:scale-110 transition"
            >
              {icons.instagram}
            </a>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <a href="/privacy" className="hover:underline">
              Privacy
            </a>
            <a href="/terms" className="hover:underline">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
      <div className="mt-7 text-center text-xs text-white/40 tracking-wide">
        &copy; {new Date().getFullYear()} JackMint. All rights reserved.
      </div>
    </footer>
  );
}