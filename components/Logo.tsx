
import React from 'react';

export const TomoroLogo: React.FC = () => (
  <svg width="192" height="96" viewBox="0 0 192 96" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
    <defs>
      <mask id="text-mask">
        <rect width="192" height="96" fill="white" />
        <text 
          x="96" 
          y="82" 
          fontFamily="'Montserrat', sans-serif"
          fontWeight="900" 
          fontSize="34" 
          textAnchor="middle" 
          fill="black"
          letterSpacing="0.05em"
        >
          TOMORO
        </text>
      </mask>
    </defs>
    <path 
      d="M0 96 A96 96 0 0 1 192 96 Z" 
      fill="#F9A825"
      mask="url(#text-mask)" 
    />
  </svg>
);
