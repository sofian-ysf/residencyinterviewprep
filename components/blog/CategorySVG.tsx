'use client';

import React from 'react';

interface CategorySVGProps {
  category: string;
  className?: string;
  index: number;
}

// Color palettes for backgrounds
const colorPalettes = [
  '#C4B5A0', // Beige
  '#A89A91', // Taupe
  '#C8B8D8', // Lavender
  '#A8C1A8', // Sage green
  '#D4A5A5', // Dusty rose
  '#9AB5D1', // Powder blue
  '#E6C9A8', // Peach
  '#B5C9C3', // Mint
  '#D1B3C4', // Blush
  '#A8B8A8', // Eucalyptus
];

// Matching stroke colors for contrast
const strokeColors = [
  '#7A6B4F', // Darker beige
  '#6B5D54', // Darker taupe
  '#8B7A9B', // Darker lavender
  '#5A7A5A', // Darker sage
  '#A67373', // Darker rose
  '#5A7A9A', // Darker blue
  '#C69A6A', // Darker peach
  '#7A9A8F', // Darker mint
  '#9A7A8A', // Darker blush
  '#6A7A6A', // Darker eucalyptus
];

// SVG Pattern System
const svgPatterns = [
  // Pattern 1: Cross with squares
  (color: string) => (
    <>
      <rect x="85" y="85" width="30" height="30" fill="none" stroke={color} strokeWidth="2"/>
      <rect x="95" y="75" width="10" height="10" fill={color} opacity="0.6"/>
      <rect x="75" y="95" width="10" height="10" fill={color} opacity="0.6"/>
      <rect x="115" y="95" width="10" height="10" fill={color} opacity="0.6"/>
      <rect x="95" y="115" width="10" height="10" fill={color} opacity="0.6"/>
      <circle cx="100" cy="100" r="5" fill={color}/>
    </>
  ),

  // Pattern 2: Eye design
  (color: string) => (
    <>
      <ellipse cx="100" cy="100" rx="40" ry="20" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="100" cy="100" r="15" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="100" cy="100" r="8" fill={color}/>
      <path d="M60 100 Q80 80 100 100 T140 100" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
      <path d="M60 100 Q80 120 100 100 T140 100" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
    </>
  ),

  // Pattern 3: Dot constellation
  (color: string) => (
    <>
      <circle cx="100" cy="100" r="3" fill={color}/>
      <circle cx="80" cy="80" r="2" fill={color} opacity="0.7"/>
      <circle cx="120" cy="80" r="2" fill={color} opacity="0.7"/>
      <circle cx="80" cy="120" r="2" fill={color} opacity="0.7"/>
      <circle cx="120" cy="120" r="2" fill={color} opacity="0.7"/>
      <circle cx="70" cy="100" r="2" fill={color} opacity="0.5"/>
      <circle cx="130" cy="100" r="2" fill={color} opacity="0.5"/>
      <circle cx="100" cy="70" r="2" fill={color} opacity="0.5"/>
      <circle cx="100" cy="130" r="2" fill={color} opacity="0.5"/>
      <path d="M80 80 L100 100 L120 80" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
      <path d="M80 120 L100 100 L120 120" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
    </>
  ),

  // Pattern 4: Target circles
  (color: string) => (
    <>
      <circle cx="100" cy="100" r="35" fill="none" stroke={color} strokeWidth="1" opacity="0.3"/>
      <circle cx="100" cy="100" r="25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="100" cy="100" r="15" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="100" cy="100" r="5" fill={color}/>
      <line x1="100" y1="60" x2="100" y2="75" stroke={color} strokeWidth="2"/>
      <line x1="100" y1="125" x2="100" y2="140" stroke={color} strokeWidth="2"/>
      <line x1="60" y1="100" x2="75" y2="100" stroke={color} strokeWidth="2"/>
      <line x1="125" y1="100" x2="140" y2="100" stroke={color} strokeWidth="2"/>
    </>
  ),

  // Pattern 5: Organic flow
  (color: string) => (
    <>
      <path d="M70 100 Q85 70 100 100 T130 100" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M75 110 Q90 85 105 110 T135 110" fill="none" stroke={color} strokeWidth="1.5" opacity="0.7"/>
      <path d="M65 90 Q80 65 95 90 T125 90" fill="none" stroke={color} strokeWidth="1" opacity="0.5"/>
      <circle cx="100" cy="100" r="4" fill={color}/>
      <circle cx="85" cy="85" r="3" fill={color} opacity="0.6"/>
      <circle cx="115" cy="85" r="3" fill={color} opacity="0.6"/>
    </>
  ),

  // Pattern 6: Grid pattern
  (color: string) => (
    <>
      <rect x="80" y="80" width="10" height="10" fill={color} opacity="0.6"/>
      <rect x="95" y="80" width="10" height="10" fill="none" stroke={color} strokeWidth="1"/>
      <rect x="110" y="80" width="10" height="10" fill={color} opacity="0.6"/>
      <rect x="80" y="95" width="10" height="10" fill="none" stroke={color} strokeWidth="1"/>
      <rect x="95" y="95" width="10" height="10" fill={color}/>
      <rect x="110" y="95" width="10" height="10" fill="none" stroke={color} strokeWidth="1"/>
      <rect x="80" y="110" width="10" height="10" fill={color} opacity="0.6"/>
      <rect x="95" y="110" width="10" height="10" fill="none" stroke={color} strokeWidth="1"/>
      <rect x="110" y="110" width="10" height="10" fill={color} opacity="0.6"/>
    </>
  ),

  // Pattern 7: Spiral design
  (color: string) => (
    <>
      <path d="M100 100 Q110 90 120 100 T120 120 Q110 130 100 120 T80 120 Q70 110 80 100 T80 80 Q90 70 100 80" 
            fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="100" cy="100" r="3" fill={color}/>
      <circle cx="90" cy="90" r="2" fill={color} opacity="0.5"/>
      <circle cx="110" cy="90" r="2" fill={color} opacity="0.5"/>
      <circle cx="110" cy="110" r="2" fill={color} opacity="0.5"/>
      <circle cx="90" cy="110" r="2" fill={color} opacity="0.5"/>
    </>
  ),

  // Pattern 8: Abstract shapes
  (color: string) => (
    <>
      <polygon points="100,70 115,95 100,120 85,95" fill="none" stroke={color} strokeWidth="2"/>
      <polygon points="100,80 107,92 100,105 93,92" fill={color} opacity="0.6"/>
      <circle cx="100" cy="70" r="3" fill={color}/>
      <circle cx="115" cy="95" r="3" fill={color}/>
      <circle cx="100" cy="120" r="3" fill={color}/>
      <circle cx="85" cy="95" r="3" fill={color}/>
    </>
  ),

  // Pattern 9: Wave lines
  (color: string) => (
    <>
      <path d="M60 90 Q80 80 100 90 T140 90" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M60 100 Q80 110 100 100 T140 100" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M60 110 Q80 100 100 110 T140 110" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="80" cy="85" r="2" fill={color} opacity="0.6"/>
      <circle cx="100" cy="100" r="3" fill={color}/>
      <circle cx="120" cy="115" r="2" fill={color} opacity="0.6"/>
    </>
  ),

  // Pattern 10: Starburst
  (color: string) => (
    <>
      <circle cx="100" cy="100" r="5" fill={color}/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 10;
        const y1 = 100 + Math.sin(rad) * 10;
        const x2 = 100 + Math.cos(rad) * 25;
        const y2 = 100 + Math.sin(rad) * 25;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            opacity={angle % 90 === 0 ? "1" : "0.5"}
          />
        );
      })}
    </>
  ),
];

export default function CategorySVG({ category, className = "", index }: CategorySVGProps) {
  const colorIndex = index % colorPalettes.length;
  const backgroundColor = colorPalettes[colorIndex];
  const strokeColor = strokeColors[colorIndex];
  const patternIndex = index % svgPatterns.length;
  const pattern = svgPatterns[patternIndex];

  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <svg 
        className="w-full h-full"
        viewBox="0 0 200 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {pattern && typeof pattern === 'function' ? pattern(strokeColor) : null}
      </svg>
    </div>
  );
}

export { colorPalettes };